// useUserProfile.ts
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { userProfileState } from '@/state/user/user_state-atoms';
import { createClient } from '@/utils/supabase/client'

export const useUserProfile = () => {
    const setUserProfile = useSetRecoilState(userProfileState);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState<Boolean>(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setProfileLoading(true);
            const supabase = createClient();
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
                setProfileError(true);
            } finally {
                setProfileLoading(false);
            }
        };
        fetchUserProfile();
    }, [setUserProfile]);

    return { profileLoading, profileError };
};
