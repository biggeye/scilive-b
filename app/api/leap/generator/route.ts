import { Leap } from "@leap-ai/workflows";

export async function POST(req: Request) {

  try {

    const bodyData = await req.json();
    const model_id = bodyData.model_id;
    const prompt = bodyData.prompt;
    const negative_prompt = bodyData.negative_prompt;
    const avatar_name = bodyData.avatar_name;
    const user_id = bodyData.user_id
    const payload = { model_id, prompt, negative_prompt }


    const leap = new Leap({
      apiKey: "le_2063514b_i5qgFukiMYVcCKDBK00U6Mgp",
    });

    const response = await leap.workflowRuns.workflow(
      {
        workflow_id: "wkf_4fajYoe5IKVwmT",
        webhook_url:
          `${process.env.NEXT_PUBLIC_NGROK_URL}/api/leap/generator/hook`,
        input: `${payload}`,
      },
    );
    if (response.status !== 201) {
      const error = await response;
      return new Response(JSON.stringify({ detail: error }), { status: 500 });
    }


    console.log(response);

    const { data, error: insertError } = await supabase
        .from('master_test')
        .insert([{
            created_by: user_id,
            name: avatar_name,
            model_id: imageModelId,
            prediction_id: imagePredictionId,
            prompt: imagePrompt,
            url: url // Assuming URL is always available at this point
        }]);

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
    }), { status: 201 });

  } catch (error) {
    // Check if the error is an instance of Error to access its message property
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), { status: 500 });
  }
}