import { uploadPrediction } from "@/lib/dashboard/receive/replicate/uploadPrediction";
import { createClient } from "@/utils/supabase/server";
import { PredictionResponsePostBody } from "@/types";

export async function POST(req: Request) {
  try {
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

    // Ensure the request body contains valid JSON data
    const body: PredictionResponsePostBody = await req.json();
    console.log("Received webhook body:", body);

    const { id, version, input: { prompt }, status, output } = body;
    const urlObj = new URL(req.url);
    const pathname = urlObj.pathname;

    if (pathname && status === 'succeeded' && output) {
      const [userId, temporaryPredictionId] = pathname.split(/[\/+]/).filter(Boolean).slice(-2);

      console.log("Prediction successful, attempting to save to database");

      // Construct payload for database upsert
      const tempdisplay = output[0];
      const payload = {
        'prediction_id': id,
        'model_id': version,
        'created_by': userId,
        'prompt': prompt,
        'temp_url': tempdisplay,
        'temp_id': temporaryPredictionId
      };

      // Upsert payload to database
      const { data, error } = await supabase.from('master_test').upsert(payload);
      if (error) {
        console.error("Error occurred during database upsert:", error);
        return new Response(JSON.stringify({ error: 'Database error', details: error }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Upload prediction
      const upload = await uploadPrediction(tempdisplay, id);
      if (upload) {
        console.log("Webhook processed successfully");
        return new Response(JSON.stringify({ message: 'Webhook processed successfully' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        console.error("Error occurred during prediction upload");
        return new Response(JSON.stringify({ error: 'Prediction upload error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      console.error("Invalid request or missing data");
      return new Response(JSON.stringify({ error: 'Invalid request or missing data' }), {
        status: 400,
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
}
