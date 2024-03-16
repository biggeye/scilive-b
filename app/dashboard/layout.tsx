'use client'
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, useToast, CircularProgress, VStack, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { createClient } from "@/utils/supabase/client";
import { ErrorBoundary } from "@saas-ui/react";
import GalleryDrawer from '@/components/GalleryDrawer';
import { useGalleryLogic } from '@/lib/gallery/useGalleryLogic';
import { useDisclosure } from '@chakra-ui/react';
import { ViewIcon } from '@saas-ui/react';
import { AddIcon, EditIcon, ImageIcon, VoiceoverIcon } from '@/components/icons/UI';
import { GalleryIcon } from '@/components/icons/UI';
import { useAuth } from "@saas-ui/auth";
import LoadingCircle from "@/components/ui/LoadingDots/LoadingCircle";
import NavbarAlpha from "@/components/NavbarAlpha";
import { ContentItem } from "@/types";
import { MessageSquareIcon, PencilIcon, PersonStandingIcon, PlusIcon } from "lucide-react";
import { SignOut } from "@/utils/auth-helpers/server";
interface DashboardLayoutProps {
  children: any
}

interface NavLinkButtonProps {
  icon: React.ReactElement;
  label: string;
  href: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      toast({
        title: `${predictionId} update!`,
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
  const shouldSidePanel = () => !isOpen && !isMobile;

  const SidePanelButton: React.FC<NavLinkButtonProps> = ({ icon, label, href }) => (
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
    return <VStack><LoadingCircle /></VStack>;
  }

  return (
    <ErrorBoundary>
      {(!isOpen && !isMobile) && (
        <VStack 
           bgImage="@/light_dots_pattern.png" bgRepeat="repeat"
           align="flex-start" position="fixed" left="0" top="200px" spacing={4}>
          <SidePanelButton icon={<PlusIcon />} label="Create Images" href="/dashboard/create-image" />
          <SidePanelButton icon={<PencilIcon />} label="Edit Images" href="/dashboard/edit-image" />
          <SidePanelButton icon={<MessageSquareIcon />} label="Write Script" href="/dashboard/write-script" />
          <SidePanelButton icon={<PersonStandingIcon />} label="Create Avatar" href="/dashboard/create-avatar" />
          {/* Additional buttons */}
        </VStack>
      )}
      <NavbarAlpha handleSignOut={handleSignOut}/>
      <Tooltip label="Gallery">
         <Button display={{ base: "none", md: "flex" }} zIndex="banner" position="fixed" left="5px" top="150px" onClick={onOpen} leftIcon={<GalleryIcon />} size="xs" />
      </Tooltip>
      {children}
      
      <GalleryDrawer
        isOpen={isOpen}
        onClose={onClose}
        items={contentItems.filter(item => item.url).map(item => ({
          content_id: item.content_id,
          url: item.url!, // Asserting url is not undefined
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