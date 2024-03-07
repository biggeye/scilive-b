// Corrected /app/dashboard/DashboardLayout.tsx
'use client'
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, useToast, CircularProgress } from "@chakra-ui/react";

import { createClient } from "@/utils/supabase/client";
import { useRecoilState } from "recoil";
import { finalPredictionState } from "@/state/replicate/prediction-atoms";
import { voiceoverScriptState } from "@/state/d-id/createTalk-atoms";
import { ErrorBoundary } from "@saas-ui/react";

interface DashboardLayoutProps {
  children: any
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const toast = useToast();
  const supabase = createClient();
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [voiceoverScript, setVoiceoverScript] = useRecoilState(voiceoverScriptState);

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
        const output = newRow.url; // Correct path to the data
        setFinalPrediction(output);
      } else if (newRow.content) {
        const output = newRow.content;
        setVoiceoverScript(output);
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
  

  return (
    <ErrorBoundary>
      <Suspense fallback={<CircularProgress isIndeterminate size="15px" thickness="5px" />}> {/* Add Suspense with a fallback */}
      <Box
        position="relative"
        h="92vh"
        textAlign="center"
        sx={{
          background: 'linear-gradient(to bottom, rgba(209,212,212,0.65) 0%,rgba(0,0,0,0) 100%)'
        }}
      >
        {children}
      </Box>
      </Suspense>
    </ErrorBoundary>
  )
};

export default DashboardLayout;
