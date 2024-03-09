'use client'
import { createClient } from '@/utils/supabase/client'
import { useRecoilState } from 'recoil';
import { userProfileState } from '@/state/user/user_state-atoms';

export async function getUserProfile() {
    const supabase = createClient();
    const [userProfile, setUserProfile] = useRecoilState(userProfileState);
    const { data, error } = await supabase
        .from('public.users')
        .select('*')
        .single()

    if (error) {
        throw error
    } else if  (data) {
        const parsed = await data.json();
        setUserProfile(parsed);
    }

    return userProfile
}