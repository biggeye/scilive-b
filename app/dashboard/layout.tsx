'use client'
// import utility
import React, { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "@saas-ui/react";
import { useRouter } from "next/navigation";
// import { useGalleryLogic } from '@/lib/gallery/useGalleryLogic';
// import { useDisclosure } from '@chakra-ui/react';
// import { ContentItem } from "@/types";
import { useSetRecoilState, useRecoilState } from "recoil";

//import auth
import { createClient } from "@/utils/supabase/client";
import { useAuth } from "@saas-ui/auth";
import { SignOut } from "@/utils/auth-helpers/server";

//import components
// import GalleryDrawer from '@/components/GalleryDrawer';
// import SidePanelButton from "@/components/utils/SidePanelButton";
import LoadingCircle from "@/components/ui/LoadingDots/LoadingCircle";
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


  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  if (!isAuthCheckComplete) {
    return <VStack><LoadingCircle /></VStack>;
  }
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const setGlobalLoading = useSetRecoilState(globalLoadingState);
  const setPredictionProgress = useSetRecoilState(predictionProgressState);
  const setPredictionStatus = useSetRecoilState(predictionStatusState);
  const setFinalPrediction = useSetRecoilState(finalPredictionState);

  const handleSignOut = async () => {
    const formData = new FormData();
    formData.append('path', '/signin'); // Append the path or other data as needed

    await SignOut(formData);
  }

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        router.push('/signin');
      } else {
        setIsAuthCheckComplete(true);
      }
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  const toast = useToast();
  const supabase = createClient();

  useEffect(() => {
    const handleEvent = (payload: any) => {
      console.log("webhook payload: ", payload);
      const newRow = payload.new;
      const predictionId = newRow.id;
      const predictionStatus = newRow.status;
      const progressStatus = newRow.progress_status;
      setPredictionProgress(progressStatus);
      if (predictionStatus === 'succeeded') {
        toast({
          title: `${predictionId} is complete!`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setGlobalLoading(false);
        setPredictionStatus("Succeeded");
        setFinalPrediction(newRow.url);


        if (newRow.url) {
          const output = newRow.url;
          console.log(output); // Correct path to the data
        } else if (newRow.content) {
          const output = newRow.content;
          console.log(output);
        }
      } else {
        if (predictionStatus === "starting")
          toast({
            title: `${predictionId}'s generator is booting up`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          })
      }
    };

    const insertSubscription = supabase
      .channel('master_content_inserts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'master_content' }, handleEvent)
      .subscribe();

    const updateSubscription = supabase
      .channel('master_content_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'master_content' }, handleEvent)
      .subscribe();

    return () => {
      supabase.removeChannel(insertSubscription);
      supabase.removeChannel(updateSubscription);
    };
  }, [router, toast]);

  // const { contentItems, handleEdit, handleDelete } = useGalleryLogic();
  // const shouldSidePanel = () => !isOpen && !isMobile;



  return (
    <ErrorBoundary>
      {/*    {(!isOpen && !isMobile) && (
        <VStack
          align="flex-start" position="fixed" left="0" top="200px" spacing={4}>
          <SidePanelButton icon={<GalleryIcon />} label="Gallery" href="/dashboard/assets" />
          <SidePanelButton icon={<PlusIcon />} label="Create Images" href="/dashboard/create-image" />
          <SidePanelButton icon={<PencilIcon />} label="Edit Images" href="/dashboard/edit-image" />
          <SidePanelButton icon={<MessageSquareIcon />} label="Write Script" href="/dashboard/write-script" />
          <SidePanelButton icon={<PersonStandingIcon />} label="Create Avatar" href="/dashboard/create-avatar" />
        </VStack>
  )}   */}
      <NavbarAlpha handleSignOut={handleSignOut} />

      {children}

      {/*}    <GalleryDrawer
        isOpen={isOpen}
        onClose={onClose}
        items={contentItems.filter(item => item.url).map(item => ({
          id: item.id,
          url: item.url!, // Asserting url is not undefined
          title: item.title,
          prompt: item.prompt,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />   */}
    </ErrorBoundary>
  );
};

export default DashboardLayout;