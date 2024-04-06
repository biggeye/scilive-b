import { uploadWebsiteSummary } from '@/lib/dashboard/receive/leap/uploadWebsiteSummary';

type WorkflowStatus = 'queued' | 'completed' | 'running' | 'failed';

interface WorkflowOutput {
  prompt: string;
  user_id: string;
  script: string;
  host_name: string;
  podcast_name: string;
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
      console.log('New Script Writer content processing: ', body.id);
      }
    
    if (body.status === 'completed' && body.output) {
      console.log('Script Writer content complete: ', body.id)
        const script = body.output.script;
        const userId = body.output.user_id;
        const prompt = body.output.prompt;
        const name = body.output.host_name;
        const title = body.output.podcast_name;
        const predictionId = body.id;
      
      await uploadWebsiteSummary(userId, predictionId, script, "leap_scriptWriterUserSummary", prompt, name, title);
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
