'use client'
import React from 'react';
import { RecoilRoot } from "recoil";
import NavbarAlpha from '@/components/NavbarAlpha';
import { UserProvider } from '@/lib/user/UserProvider';
import { ClientLayoutProps } from '@/types';
import { SaasProvider, AppShell } from '@saas-ui/react'
import { AuthProvider } from '@saas-ui/auth'
import { createAuthService } from '@saas-ui/supabase'
import { createClient } from '@/utils/supabase/client';
import { sciLiveTheme } from './theme';


const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
 
  const supabaseClient = createClient();

  return (
    <SaasProvider theme={sciLiveTheme}>
      <AuthProvider {...createAuthService(supabaseClient)}>
        <RecoilRoot>
          <UserProvider>
            <AppShell
            h="100vh" variant="static"
              navbar={<NavbarAlpha />}>
             
                {children}
          
            </AppShell>
          </UserProvider>
        </RecoilRoot>
      </AuthProvider>
    </SaasProvider>
  );
};

export default ClientLayout;
