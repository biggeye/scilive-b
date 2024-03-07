'use client'
import React from 'react';
import { AppShell, SaasProvider } from '@saas-ui/react';
import { RecoilRoot } from "recoil";
import NavbarAlpha from '@/components/NavbarAlpha';
import { UserProvider } from '@/lib/user/UserProvider';
import { ClientLayoutProps } from '@/types';

import { AuthProvider } from '@saas-ui/auth'
import { createAuthService } from '@saas-ui/supabase'
import { createClient } from '@/utils/supabase/client';



const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {

  const supabaseClient = createClient();

  return (
    <SaasProvider>
      <AuthProvider {...createAuthService(supabaseClient)}>
        <RecoilRoot>
          <UserProvider>
            <AppShell variant="static"
              navbar={<NavbarAlpha />}>
              <main
                id="skip"
                className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
              >
                {children}
              </main>
            </AppShell>
          </UserProvider>
        </RecoilRoot>
      </AuthProvider>
    </SaasProvider>
  );
};

export default ClientLayout;
