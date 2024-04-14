import { Leap } from "@leap-ai/workflows";
import { createClient } from "@/utils/supabase/route";

interface BodyData {
  model_id: string;
  prompt: string;
  negative_prompt: string;
  avatar_name: string;
  user_id: string;
}

interface SupabaseData {
  created_by: string;
  name: string;
  model_id: string;
  prediction_id: string;
  prompt: string;
  url: string;
}

export async function POST(req: Request) {
  const supabase = createClient(req);
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
    const bodyData: BodyData = await req.json();
    const payload = {
      model_id: bodyData.model_id,
      prompt: bodyData.prompt,
      negative_prompt: bodyData.negative_prompt
    }

    const leap = new Leap({
      apiKey: "le_2063514b_i5qgFukiMYVcCKDBK00U6Mgp",
    });

    const response = await leap.workflowRuns.workflow(
      {
        workflow_id: "wkf_4fajYoe5IKVwmT",
        webhook_url: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/leap/generator/hook`,
        input: payload,
      },
    );

    if (response.status !== 201) {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Error with the workflow response.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabaseData: SupabaseData = {
      created_by: bodyData.user_id,
      name: bodyData.avatar_name,
      model_id: bodyData.model_id,
      prediction_id: response.data.id,
      prompt: bodyData.prompt,
      url: response.data.output ?? ""
    }

    const { data, error: insertError } = await supabase
        .from('master_test')
        .insert([supabaseData]);

    if (insertError) {
      console.error('Error posting prediction data to Supabase:', insertError);
      throw new Error('Error posting prediction data to Supabase!');
    }

    return new Response(JSON.stringify({
      id: response.data.id,
      status: response.data.status,
      created_at: response.data.created_at,
      workflow_id: response.data.workflow_id,
      input: response.data.input,
      output: response.data.output, // This will be null if the workflow is still running
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Check if the error is an instance of Error to access its message property
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Internal Server Error',
      details: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
