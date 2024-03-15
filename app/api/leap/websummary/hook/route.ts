import { uploadWebsiteSummary } from '@/lib/dashboard/receive/leap/uploadWebsiteSummary';

type WorkflowStatus = 'queued' | 'completed' | 'running' | 'failed';

interface WorkflowOutput {
  script: string;
  user_id: string;
  url: string;
}

interface WorkflowWebhookRequestBody {
  id: string;
  version_id: string;
  status: WorkflowStatus;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  workflow_id: string;
  error: string | null;
  input: Record<string, any>;
  output: WorkflowOutput | null;
}

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

  try {
    const body: WorkflowWebhookRequestBody = await req.json();
    console.log('Received webhook for workflow:', body.id);
    if (body.status === 'queued' || body.status === 'running') {
      console.log('New Script Writer content received: ', body.id);
      // Ensure userId is defined. Example:
      const userId = body.input.user_id; // Assuming user_id comes from the webhook body's input
      const predictionId = body.id;
      await uploadWebsiteSummary(predictionId, userId); // Assuming this is the correct usage
    }
    
    if (body.status === 'completed' && body.output) {
      console.log('Script Writer content complete: ', body.id)
        const { script: content, user_id: userId, url: prompt } = body.output;

        const predictionId = body.id;
      
      await uploadWebsiteSummary(userId, predictionId, content, "leapWebsiteSummary", prompt);
  }
  

    // Assuming you want to return a success message after processing
    return new Response(JSON.stringify({ message: 'Webhook processed successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Internal Server Error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
