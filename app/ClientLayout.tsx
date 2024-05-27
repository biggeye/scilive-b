'use client'

import React from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { SaasProvider } from '@saas-ui/react'
import { AuthProvider } from '@saas-ui/auth'
import { RecoilRoot } from "recoil";
import { sciLiveTheme } from './theme';
import { ClientLayoutProps } from '@/types';

// Mock Supabase Client with TypeScript types
const supabaseClient = {
  auth: {
    user: null,
    signIn: async (credentials: { email: string; password: string }) => {
      console.log('Mock signIn', credentials);
      return { user: { id: 'mockUserId' }, error: null };
    },
    signOut: async () => {
      console.log('Mock signOut');
      return { error: null };
    }
  },
  from: (table: string) => ({
    select: () => ({ data: [], error: null }),
    insert: (data: any) => {
      console.log('Mock insert', data);
      return { data, error: null };
    },
    update: (data: any) => {
      console.log('Mock update', data);
      return { data, error: null };
    }
  })
};

// Mock createAuthService function
const createAuthService = (client: any) => {
  return {
    client,
    signIn: client.auth.signIn,
    signOut: client.auth.signOut,
  };
};

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
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
