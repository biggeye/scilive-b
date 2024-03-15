import { uploadPrediction } from "@/lib/dashboard/receive/replicate/uploadPrediction";
import { uploadMultiplePredictions } from "@/lib/dashboard/receive/replicate/uploadMultiplePredictions";
import { createClient } from "@/utils/supabase/server";

interface PredictionResponsePostBody {
  id: string;
  model: string;
  version: string;
  input: {
    image: string; // Assuming base64 image data is a string
    prompt: string;
  };
  logs: string;
  output: string[];
  error: null | string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'cancelled'; // Adjust based on possible values
  created_at: string;
  started_at: string;
  completed_at: string;
  webhook: string;
  urls: {
    cancel: string;
    get: string;
  };

  metrics: {
    predict_time: number;
  };
}
export async function POST(req: Request) {
  const supabase = createClient();

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      error: 'Method Not Allowed',
      description: 'This endpoint only supports POST requests.',
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {

    const body: PredictionResponsePostBody = await req.json();
    console.log("webhook -incoming-: ", body);
    console.log('Received webhook for workflow:', body.id);
    const url = require('url');
    const userId = url.parse(req.url).pathname.split('/').pop();
    const modelId = body.version;
    const cancelUrl = body.urls.cancel;
    const predictionId = body.id;
    const prompt = body.input.prompt;
    const status = body.status;

    if (body.status === 'starting') {
       console.log("predictionId: ", predictionId, "userId: ", userId, "prompt: ", prompt, "status: ", body.status);
      const { data, error } = await supabase
        .from('master_content')
        .insert([
          { prediction_id: predictionId, created_by: userId, prompt: prompt, status: body.status }
        ]);

      if (error) {
        console.error('Error inserting to Supabase:', error);
        return new Response(JSON.stringify({ error: 'Database insertion failed' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else if (body.status === 'processing') {
      // Update Supabase table "master_content"
      const { data, error } = await supabase
        .from('master_content')
        .update({ status: body.status })
        .match({ prediction_id: predictionId });

      if (error) {
        console.error('Error updating Supabase:', error);
        return new Response(JSON.stringify({ error: 'Database update failed' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }



    if (body.status === 'succeeded' && body.output) {
      const { output } = body;
  
      // Handle output as an array of strings
      if (Array.isArray(output) && output.every(item => typeof item === 'string')) {
          try {
              const urls = await uploadMultiplePredictions(output, userId, modelId, predictionId, prompt);
              // Return these URLs in your response
              return new Response(JSON.stringify({ message: 'Webhook processed successfully', urls }), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
              });
          } catch (error) {
              console.error('Error uploading predictions:', error);
              // Handle error case here
          }
      } else if (typeof output === 'string') {
          // Handle single string output
          try {
              const url = await uploadPrediction(output, userId, modelId, `${predictionId}-0`, prompt);
              // Return this URL in your response
              return new Response(JSON.stringify({ message: 'Webhook processed successfully', url }), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
              });
          } catch (error) {
              console.error('Error uploading prediction:', error);
              // Handle error case here
          }
      } else {
          console.error('output is neither an array of strings nor a string');
          // Handle invalid output type here
      }
  }

  } catch (error) {
     console.error('Error handling webhook:')
  }
}