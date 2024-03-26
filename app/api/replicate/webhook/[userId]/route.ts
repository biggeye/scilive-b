import { uploadPrediction } from "@/lib/dashboard/receive/replicate/uploadPrediction";
import { createClient } from "@/utils/supabase/server";
import { PredictionResponsePostBody } from "@/types";

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
    const { id, version, input: { prompt }, status, output } = body;
    const urlObj = new URL(req.url);
    const pathname = urlObj.pathname;

    if (pathname) {
      const [userId, temporaryPredictionId] = pathname.split(/[\/+]/).filter(Boolean).slice(-2);


      console.log("Received webhook body");

      if (status === 'succeeded' && output && userId) {
        console.log("Prediction successful, attempting to save to database");
        const tempdisplay = output[0];
        const payload = {
          'prediction_id': id,
          'model_id': version,
          'created_by': userId,
          'prompt': prompt,
          'temp_url': tempdisplay,
          'temp_id': temporaryPredictionId
        };
        const { data, error } = await supabase
          .from('master')
          .insert(payload);
        if (data) {
          console.log("master table updated:", data);
        } else if (error) {
          console.log("error occured: ", error)
          return new Response(JSON.stringify({ message: 'Webhook crash & burn', error }))
        }
        const upload = await uploadPrediction(tempdisplay, id);
        if (upload) {
          return new Response(JSON.stringify({ message: 'Webhook processed successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        };
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
