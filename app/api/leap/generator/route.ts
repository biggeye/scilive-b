import { NextApiRequest, NextApiResponse } from 'next';
import { Leap } from "@leap-ai/workflows";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const bodyData: BodyData = JSON.parse(req.body);
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
          webhook_url:
            `${process.env.NEXT_PUBLIC_NGROK_URL}/api/leap/generator/hook`,
          input: `${payload}`,
        },
      );
      if (response.status !== 201) {
        const error = await response;
        res.status(500).json({ detail: error });
        return;
      }

      console.log(response);

      const supabaseData: SupabaseData = {
        created_by: bodyData.user_id,
        name: bodyData.avatar_name,
        model_id: bodyData.model_id,
        prediction_id: response.data.id,
        prompt: bodyData.prompt,
        url: response.data.output // Assuming URL is always available at this point
      }

      const { data, error: insertError } = await supabase
          .from('master_test')
          .insert([supabaseData]);

      if (insertError) {
          console.error('Error posting prediction data to Supabase:', insertError);
          throw new Error('Error posting prediction data to Supabase!');
      }

      res.status(201).json({
        id: response.data.id,
        status: response.data.status,
        created_at: response.data.created_at,
        workflow_id: response.data.workflow_id,
        input: response.data.input,
        output: response.data.output, // This will be null if the workflow is still running
      });

    } catch (error) {
      // Check if the error is an instance of Error to access its message property
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(error);
      res.status(500).json({ error: 'Internal server error', details: errorMessage });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
