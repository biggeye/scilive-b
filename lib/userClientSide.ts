'use client'
import { createClient } from '@/utils/supabase/client'

export async function getUserProfile() {
    const supabase = createClient();
    const userId = supabase.auth.user()?.id
    const { data: userProfile, error } = await supabase
        .from('public.users')
        .select('*')
        .eq('id', userId)
        .single()

    if (error) {
        throw error
    }

    return userProfile
}
