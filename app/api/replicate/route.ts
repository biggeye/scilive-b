import { createClient } from '@/utils/supabase/route';

export async function POST(req: Request) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();

  if (!session) {

    return new Response(JSON.stringify({
      error: 'not_authenticated',
      description: 'The user does not have an active session or is not authenticated',
    }), { status: 401 });
  }

  try {
    const { version, user_id, prompt, input_images, temporaryPredictionId } = await req.json();
    const payload = {
      version,
      input: { prompt, input_images },
      webhook: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/replicate/webhook/${user_id}+${temporaryPredictionId}`,
    };
    const predictionCallResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    if (!predictionCallResponse.ok) {
      const errorText = await predictionCallResponse.text(); 
      console.error('API call failed:', errorText);
      return new Response(errorText, { status: predictionCallResponse.status });
    }
    const responseData = await predictionCallResponse.json();
    if (responseData.status) {
      const createRecord = await supabase
        .from('master_test')
        .insert('prediction_id', responseData.id);
      if (createRecord) {
        return new Response(JSON.stringify({
          id: responseData.id,
          message: "Prediction started successfully"
        }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        })
      };
    } else {
      return new Response(JSON.stringify(responseData), { status: responseData.status });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error }), { status: 500 });
  }
}
