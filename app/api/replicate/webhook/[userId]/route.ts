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
      const pathnameParts = pathname.split('/'); // Split the pathname by '/'
      const userId = pathnameParts[pathnameParts.length - 1]; // Get the last part, which should be the UUID



      console.log("So where are you from originally?");

      if (status === 'succeeded' && output && userId) {
        console.log(status, output, userId);
        const predictionUrl = output[0];
        const payload = {
          'prediction_id': id,
          'model_id': version,
          'created_by': userId,
          'prompt': prompt,
        };
        const { data, error } = await supabase
          .from('master_test')
          .upsert(payload)
          .like('prediction_id', id);

       if (error) {
          console.log("error occured: ", error)
          return new Response(JSON.stringify({ message: 'Webhook crash & burn updating master table', error }))
        }
        const upload: any = await uploadPrediction(userId, predictionUrl, id);
        const uploadPredictionResponse = await upload;
        if (uploadPredictionResponse) {
          return new Response(JSON.stringify({ message: 'Webhook data uploaded successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        };
      }
    }
    return new Response(JSON.stringify({ status: 201 }));
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Error processing webhook' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
