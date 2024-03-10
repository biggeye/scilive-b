// Corrected /app/dashboard/DashboardLayout.tsx
'use client'
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, useToast, CircularProgress } from "@chakra-ui/react";
import { createClient } from "@/utils/supabase/client";
import { useRecoilValue, useRecoilState } from "recoil";
import { ErrorBoundary } from "@saas-ui/react";
import { userProfileState } from "@/state/user/user_state-atoms";
import { getUserProfile } from '@/lib/userClientSide';

interface DashboardLayoutProps {
  children: any
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const supabase = createClient();
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  useEffect(() => {
    const handleEvent = (payload: any) => {
      console.log("webhook payload: ", payload);
      const newRow = payload.new;
      const predictionId = newRow.id;
      toast({
        title: `${predictionId} complete!`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      // Corrected access to payload data
      if (newRow.url) {
        const output = newRow.url;
        console.log(output); // Correct path to the data
      } else if (newRow.content) {
        const output = newRow.content;
        console.log(output);
      }
    };
  
    // Subscription for INSERT events
    const insertSubscription = supabase
      .channel('master_content_inserts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master_content' }, handleEvent)
      .subscribe();
  
    // Subscription for UPDATE events
    const updateSubscription = supabase
      .channel('master_content_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'master_content' }, handleEvent)
      .subscribe();
  
    // Cleanup function to unsubscribe from channels
    return () => {
      supabase.removeChannel(insertSubscription);
      supabase.removeChannel(updateSubscription);
    };
  }, [router, toast]);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userProfile?.id) {
        await getUserProfile();
      }
    };


    fetchUserProfile();
  }, []);


  return (
    <ErrorBoundary>
       <Box
        position="relative"
        h="100%"
        textAlign="center"
        bgGradient="linear(to-t, white, gray.200, white)"
      >
        {children}
      </Box>
     
    </ErrorBoundary>
  )
};

export default DashboardLayout;
