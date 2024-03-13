'use client'
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, useToast, CircularProgress, VStack, Tooltip } from "@chakra-ui/react";
import { createClient } from "@/utils/supabase/client";
import { useRecoilValue, useRecoilState } from "recoil";
import { ErrorBoundary } from "@saas-ui/react";
import { userProfileState } from "@/state/user/user_state-atoms";
import { useUserProfile } from "@/lib/user/useUserProfile";
import GalleryDrawer from '@/components/GalleryDrawer';
import { useGalleryLogic } from '@/lib/gallery/useGalleryLogic';
import { useDisclosure } from '@chakra-ui/react';
import { ViewIcon } from '@saas-ui/react';
import { AddIcon, EditIcon, ImageIcon, VoiceoverIcon } from '@/components/icons/UI';
// Import your custom GalleryIcon if it's different from the one provided by Chakra UI
import { GalleryIcon } from '@/components/icons/UI';
import { useAuth } from "@saas-ui/auth";
import LoadingCircle from "@/components/ui/LoadingDots/LoadingCircle";

interface DashboardLayoutProps {
  children: any
}

interface NavLinkButtonProps {
  icon: React.ReactElement; // Adjusted for JSX element
  label: string;
  href: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false); // New state

  useEffect(() => {
    if (!auth.isLoading) {
      if (!auth.isAuthenticated) {
        router.push('/signin');
      } else {
        setIsAuthCheckComplete(true); // Set true only if authenticated
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

  const { contentItems, handleEdit, handleDelete } = useGalleryLogic();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLinkButton: React.FC<NavLinkButtonProps> = ({ icon, label, href }) => (
    <Tooltip label={label} placement="right">
      <Button
        onClick={() => router.push(href)}
        variant="ghost"
        zIndex="banner"
        position="relative"
        left="5px"
        size="sm"
        aria-label={label} // Accessibility improvement
      >
        {icon}
      </Button>
    </Tooltip>
  );

  if (!isAuthCheckComplete) {
    return (
    <VStack>
    <LoadingCircle />
    </VStack>
    )
  }

  return (
    <ErrorBoundary>
      {!isOpen && (
        <VStack align="flex-start" position="fixed" left="0" top="20%" spacing={4}>
          <NavLinkButton icon={<ImageIcon />} label="Create Images" href="/dashboard/create-image" />
          <NavLinkButton icon={<EditIcon />} label="Edit Images" href="/dashboard/edit-image" />
          <NavLinkButton icon={<VoiceoverIcon />} label="Clone Voice" href="/dashboard/clone-voice" />
          <NavLinkButton icon={<AddIcon />} label="Create Avatar" href="/dashboard/create-avatar" />
          {/* Add additional buttons as needed */}
        </VStack>
      )}
      <Button zIndex="sticky" position="fixed" right="5px" top="20%" onClick={onOpen} leftIcon={<GalleryIcon />} size="sm" />
      <Box zIndex="-100" bgGradient="linear(to-t, primary.100, transparent)">
      {children}
      </Box>
      <GalleryDrawer
        isOpen={isOpen}
        onClose={onClose}
        items={contentItems.map(item => ({
          content_id: item.content_id,
          url: item.url,
          title: item.title,
          prompt: item.prompt,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </ErrorBoundary>
  );
};

export default DashboardLayout;