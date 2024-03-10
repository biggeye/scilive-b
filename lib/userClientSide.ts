'use client'
import { createClient } from '@/utils/supabase/client'
import { useRecoilState } from 'recoil';
import { userProfileState } from '@/state/user/user_state-atoms';

export async function getUserProfile() {
    const supabase = createClient();
    const [userProfile, setUserProfile] = useRecoilState(userProfileState);
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .single()
        if (error) {
            throw error;
        }

        if (data) {
            setUserProfile(data);
}
    } catch (error) {
        console.error("Error fetching user profile: ", error);
    }

    return userProfile
}