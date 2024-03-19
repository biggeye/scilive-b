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
    const logs = body.logs;
    const url = require('url');
    const userId = url.parse(req.url).pathname.split('/').pop();
    const modelId = body.version;
    const cancelUrl = body.urls.cancel;
    const predictionId = body.id;
    const prompt = body.input.prompt;
    const status = body.status; +
      console.log("Received workflow:");
    console.log("Prediction ID:", body.id);
    console.log("User ID:", userId);
    console.log("Model ID:", body.version);
    console.log("Prompt:", body.input.prompt);
    console.log("Status:", body.status);
    console.log("Cancel URL:", body.urls.cancel);

  /*  if (body.status === 'starting') {
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
    } else
    */ if (body.status === 'processing') {
      const { data, error } = await supabase
        .from('master_content')
        .upsert({ prediction_id: predictionId, created_by: userId, prompt: prompt, status: body.status, cancel_url: cancelUrl })
        .match({ prediction_id: predictionId });

      if (error) {
        console.error('Error updating Supabase:', error);
        return new Response(JSON.stringify({ error: 'Database update failed' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        })
      };

      return new Response(JSON.stringify({ message: `${predictionId} is processing.  ${cancelUrl} to cancel`, status: `${body.status}`, logs: `${logs}` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (body.status === 'succeeded' && body.output) {
      const { output } = body;

      // Handle output as an array of strings
      if (Array.isArray(output) && output.every(item => typeof item === 'string')) {
        try {
          const { data, error } = await supabase
            .from('master_content')
            .upsert({ prediction_id: predictionId, created_by: userId, prompt: prompt, status: body.status })
            .match({ prediction_id: predictionId });

          const urls = await uploadMultiplePredictions(output, userId, modelId, predictionId, prompt);
          // Return these URLs in your response
          return new Response(JSON.stringify({ message: 'Webhook processed successfully', urls }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })

        } catch (error) {
          console.error('Error handling webhook:', error);
          return new Response(JSON.stringify({ error: 'Error handling webhook' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }

      } else if (typeof output === 'string') {
        // Handle single string output
        try {
          const url = await uploadPrediction(output, userId, modelId, `${predictionId}-0`, prompt);
          const finalPrediction = await url;
          await supabase
          .from('master_content')
          .upsert({ prediction_id: predictionId, created_by: userId, prompt: prompt, status: body.status, url: finalPrediction })
          .match({ prediction_id: predictionId });
          console.log("finalPredictoin:", finalPrediction);
          return new Response(JSON.stringify({ message: 'Webhook processed successfully', finalPrediction }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })

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