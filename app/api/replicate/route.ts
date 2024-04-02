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
    let image;
    if (Array.isArray(input_images)) { 
      image = input_images;
    } else {
      image = input_images;
    }
    const payload = {
      version,
      input: { prompt, image },
      webhook: `https://scilive.cloud/api/replicate/webhook/${user_id}+${temporaryPredictionId}`,

    };  
   
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorText = await response.text(); // Use text() to avoid JSON parse error
      console.error('API call failed:', errorText);
      return new Response(errorText, { status: response.status });
    }
    const responseData = await response.json();
    if (response.status === 201) {
      const createRecord = await supabase
      .from('master')
      .insert('prediction_id', responseData.id);
      if (createRecord) {
      return new Response(JSON.stringify({
        id: responseData.id,
        message: "Prediction started successfully"
      }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      })};
    } else {
      return new Response(JSON.stringify(responseData), { status: response.status });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error }), { status: 500 });
  }
}
