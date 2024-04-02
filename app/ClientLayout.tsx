'use client'
import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { SaasProvider } from '@saas-ui/react'
import { AuthProvider } from '@saas-ui/auth'
import { createAuthService } from '@saas-ui/supabase'
import { RecoilRoot } from "recoil";
import { createClient } from '@/utils/supabase/client';
import { sciLiveTheme } from './theme';

import { ClientLayoutProps } from '@/types';

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {

  const supabaseClient = createClient();

  return (
    <CacheProvider>
      <SaasProvider theme={sciLiveTheme}>
        <AuthProvider {...createAuthService(supabaseClient)}>
          <RecoilRoot>
            {children}
          </RecoilRoot>
        </AuthProvider>
      </SaasProvider>
    </CacheProvider>
  );
};

export default ClientLayout;
