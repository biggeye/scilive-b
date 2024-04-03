'use client'
// import utility
import React, { Suspense, useEffect, useState } from "react";
import { AppShell, ErrorBoundary } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState, useRecoilState } from "recoil";
//import auth
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@saas-ui/auth";
import { SignOut } from "@/utils/auth-helpers/server";
//import components
import LoadingCircle from "@/components/ui/LoadingDots/LoadingCircle";
import DisplayResults from "@/components/dashboard/DisplayResults";
import NavbarAlpha from "@/components/NavbarAlpha";
//import UI
import { Box, Button, useToast, CircularProgress, VStack, Tooltip, useBreakpointValue } from '@chakra-ui/react';
//import state
import { globalLoadingState, predictionStatusState, predictionProgressState, finalPredictionState } from "@/state/replicate/prediction-atoms";
interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();

  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        router.push('/signin');
      } else {
        setIsAuthCheckComplete(true);
      }
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const setGlobalLoading = useSetRecoilState(globalLoadingState);
  const setPredictionProgress = useSetRecoilState(predictionProgressState);
  const setPredictionStatus = useSetRecoilState(predictionStatusState);
  const setFinalPrediction = useSetRecoilState(finalPredictionState);

  const handleSignOut = async () => {
    const formData = new FormData();
    formData.append('path', '/signin');

    await SignOut(formData);
  }

  const toast = useToast();
  const supabase = createClient();

  useEffect(() => {
    const handleEvent = (payload: any) => {
      console.log("webhook payload: ", payload);
      const newRow = payload.new;
      setGlobalLoading(false);
      setPredictionStatus("Succeeded");
      // cancelTempId(newRow.temp_id);
      setFinalPrediction(newRow.temp_url);
    };

    const itemInsertSubscriptions = supabase
      .channel('item_inserts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'items' }, handleEvent)
      .subscribe();

    const masterInsertSubscriptions = supabase
      .channel('master_inserts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master' }, handleEvent)
      .subscribe();

    return () => {
      supabase.removeChannel(itemInsertSubscriptions);
      supabase.removeChannel(masterInsertSubscriptions);
    };
  }, []);

  if (!isAuthCheckComplete) {
    return <VStack><LoadingCircle /></VStack>;
  }

  return (
    <ErrorBoundary>
<Suspense fallback={<VStack><LoadingCircle /></VStack>}>
      <AppShell
        navbar={<NavbarAlpha handleSignOut={handleSignOut} />}>
        <DisplayResults />
        {children}
      </AppShell>
</Suspense>
    </ErrorBoundary>
  );
};

export default DashboardLayout;