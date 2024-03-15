import { Leap } from "@leap-ai/workflows";

export async function POST(req: Request) {
  try {
    const bodyData = await req.json();
    const user_id = bodyData.userId;
    const host_name = bodyData.hostName;
    const podcast_name = bodyData.podcastName;
    const webpage_url = bodyData.webpageUrl;

    const leap = new Leap({
      apiKey: process.env.NEXT_PUBLIC_LEAP_API_KEY, // Corrected syntax for environment variable
    });

    const response = await leap.workflowRuns.workflow({
      workflow_id: "wkf_U3tsr91oDF9UaL",
      webhook_url: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/leap/websummary/hook`,
      input: {
        webpage_url: webpage_url,
        host: host_name,
        podcast: podcast_name,
        user_id: user_id,
      },
    });

    if (response.status !== 201) {
      const error = await response;
      return new Response(JSON.stringify({ detail: error }), { status: 500 });
    }

    console.log(response);
    return new Response(JSON.stringify({
      id: response.data.id,
      status: response.data.status,
      created_at: response.data.created_at,
      workflow_id: response.data.workflow_id,
      input: response.data.input,
      output: response.data.output,
    }), { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), { status: 500 });
  }
}
