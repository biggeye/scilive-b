'use client'
import React from 'react';
import { SaasProvider, AppShell } from '@saas-ui/react'
import { AuthProvider } from '@saas-ui/auth'
import { createAuthService } from '@saas-ui/supabase'
import { Box } from '@chakra-ui/react';
import { RecoilRoot } from "recoil";
import { createClient } from '@/utils/supabase/client';
import NavbarAlpha from '@/components/NavbarAlpha';
import SidebarNav from '@/components/SidebarNav';
import { sciLiveTheme } from './theme';
import '@fontsource-variable/exo-2';
import '@fontsource-variable/orbitron';
import '@fontsource/press-start-2p';
import '@fontsource-variable/antonio';
import { ClientLayoutProps } from '@/types';
import { ParallaxProvider } from 'react-scroll-parallax';

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {

  const supabaseClient = createClient();

  return (
    <SaasProvider theme={sciLiveTheme}>
      <AuthProvider {...createAuthService(supabaseClient)}>
        <RecoilRoot>
          <ParallaxProvider>
          <AppShell
            h="100vh" variant="static"
            bgGradient="linear(to-t, primary.100, transparent)"
            >
            {children}
          </AppShell>
          </ParallaxProvider>
        </RecoilRoot>
      </AuthProvider>
    </SaasProvider>
  );
};

export default ClientLayout;
