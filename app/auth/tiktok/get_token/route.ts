import { createClient } from '@/utils/supabase/route';

export async function POST(req: Request) {
  const supabase = createClient(req);
  const session = await supabase.auth.getSession();
  const user_id = await session.data.session?.user.id;

  const tikApiOauthToken = await supabase.from('tikapi').select('access_token').eq('created_by', user_id);

  if (tikApiOauthToken) {
    return tikApiOauthToken;
  }

}