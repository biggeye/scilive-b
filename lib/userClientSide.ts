'use client'
import { createClient } from '@/utils/supabase/client'

export async function getUserProfile() {
    const supabase = createClient();
    const { data: userProfile, error } = await supabase
        .from('public.users')
        .select('*')
        .single()

    if (error) {
        throw error
    }

    return userProfile
}
