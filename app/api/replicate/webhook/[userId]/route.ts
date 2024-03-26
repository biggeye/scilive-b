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

  try {
    const { id, version, input: { prompt }, status, output, urls: { cancel, get } } = body;
    const urlObj = new URL(req.url);
    const pathname = urlObj.pathname;

    if (pathname) {
      const [userId, temporaryPredictionId] = pathname.split('/').slice(-2);

      console.log("Received webhook body");

      if (status === 'succeeded' && output && userId) {
        console.log("Prediction successful, attempting to save to database");
        const tempdisplay = output[0];
        const { data, error } = await supabase
          .from('master')
          .insert({ prediction_id: id, model_id: version, created_by: userId, prompt, temp_url: tempdisplay, temp_id: temporaryPredictionId});

        console.log("master table updated:", data);

        let urls;

        if (Array.isArray(output) && output.length > 1) {
          console.log("Multiple predictions received. Uploading each prediction...");
          urls = await uploadMultiplePredictions(output, temporaryPredictionId);
        } else if (output.length === 1) {
          console.log("Single prediction received. Uploading prediction...");
          urls = await uploadPrediction(output[0], `${temporaryPredictionId}`);
        }

        console.log("Upload URLs:", urls);

        return new Response(JSON.stringify({ message: 'Webhook processed successfully', urls }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
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
