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
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      error: 'Method Not Allowed',
      description: 'This endpoint only supports POST requests.',
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const supabase = createClient();
  const body: PredictionResponsePostBody = await req.json();
  console.log("Webhook object: ", body);

  try {
    const { id, version, input: { prompt }, status, output, urls: { cancel, get } } = body;
    const logs = body.logs;
    const userId = getUserIdFromRequestUrl(req);
    const modelId = version;
    const predictionId = id;

    if (status === 'succeeded' && output && userId) {
      console.log("Prediction successful, attempting to save to database", "", "", "", "");
      const { data, error } = await supabase
        .from('master')
        .insert({ prediction_id: predictionId, model_id: modelId, created_by: userId, prompt: prompt });

        console.log("master table updated: ", data);
        let urls;

        if (Array.isArray(output) && output.length > 1) {
          urls = await uploadMultiplePredictions(output, predictionId);
        } else if (output.length === 1) {
          urls = await uploadPrediction(output[0], `${predictionId}`);
        }

      return new Response(JSON.stringify({ message: 'Webhook processed successfully', urls }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Error processing webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ message: "Status Unknown" }));
}

function getUserIdFromRequestUrl(req: Request): string | undefined {
  try {
    const url = require('url');
    const userId = url.parse(req.url).pathname.split('/').pop();
    return userId;
  } catch (error) {
    console.error('Error extracting user ID from request URL:', error);
    return undefined;
  }
}
