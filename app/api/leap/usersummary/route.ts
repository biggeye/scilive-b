import { Leap } from "@leap-ai/workflows";

export async function POST(req: Request) {
  try {
    const { user_id, host_name, podcast_name, user_summary } = await req.json();

    const leap = new Leap({
      apiKey: "le_4c206806_xa10A9R1zHlbdB6JPjhx2MeH", //
    });
      const response = await fetch("https://api.workflows.tryleap.ai/v1/runs", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workflow_id: "wkf_kQgkJxriFLNTbe",
        webhook_url: `${process.env.NEXT_PUBLIC_NGROK_URL}/api/leap/usersummary/hook`,
        input: {
          user_summary: user_summary,
          podcast: podcast_name,
          host: host_name,
          user_id: user_id,
        }
      })
    });


    if (response.status !== 201) {
      const error = await response;
      return new Response(JSON.stringify({ detail: error }), { status: 500 });
    }

    console.log(response);
    return new Response(JSON.stringify({
      response
    }), { status: 201 });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), { status: 500 });
  }
}
