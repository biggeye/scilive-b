import { createClient } from '@/utils/supabase/route';
import Replicate from 'replicate';
import { convertToDataURI } from '@/utils/convertToDataURI';

export async function POST(req: Request) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();
  const replicate = new Replicate();

  try {

    const input = await req.json();
    const upload = convertToDataURI(input);
    const output = await replicate.run("smoretalk/rembg-enhance:4067ee2a58f6c161d434a9c077cfa012820b8e076efa2772aa171e26557da919", { upload });
    return new Response(JSON.stringify({output}));

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error }), { status: 500 });
  }
}
