'use client'
import { createClient } from '@/utils/supabase/client'
import { useRecoilState } from 'recoil';
import { userProfileState } from '@/state/user/user_state-atoms';

export async function getUserProfile() {
    const supabase = createClient();
    const [userProfile, setUserProfile] = useRecoilState(userProfileState);
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .single()

    try {
        if (data) {
            const parsed = JSON.parse(data);
            setUserProfile(parsed);
        }
    } catch (error) {
        throw error;
    }

    return userProfile
}