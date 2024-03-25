'use server'
import { createClient } from "@/utils/supabase/server";

export const useAccountDetails = async () => {
const supabase = createClient();
    const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();

  const userId = await userDetails?.id

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

    return ({userId, userDetails, subscription})
}