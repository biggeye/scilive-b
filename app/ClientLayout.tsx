'use client'
import React from 'react';
import { SaasProvider, AppShell } from '@saas-ui/react'
import { AuthProvider } from '@saas-ui/auth'
import { createAuthService } from '@saas-ui/supabase'
import { RecoilRoot } from "recoil";
import { createClient } from '@/utils/supabase/client';
import NavbarAlpha from '@/components/NavbarAlpha';
import { sciLiveTheme } from './theme';
import { ClientLayoutProps } from '@/types';

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
 
  const supabaseClient = createClient();

  return (
    <SaasProvider theme={sciLiveTheme}>
      <AuthProvider {...createAuthService(supabaseClient)}>
        <RecoilRoot>
            <AppShell
            h="100vh" w="100vw" variant="static"
              navbar={<NavbarAlpha />}>
                <main>
                {children}
                </main>
            </AppShell>
        </RecoilRoot>
      </AuthProvider>
    </SaasProvider>
  );
};

export default ClientLayout;
