'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Auth } from '@saas-ui/auth';
import { useSnackbar } from '@saas-ui/react';
import Logo from '@/components/icons/Logo';
import { useRouter } from 'next/navigation';


const getAbsoluteUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path;
  }
  return window.location.origin;
};

const SignUp: React.FC = () => {
  const snackbar = useSnackbar()
  const router = useRouter();
  return (
    <Card flex="1" maxW="400px">
      <CardHeader display="flex" alignItems="center" justifyContent="center">
        <Logo width="120" height="120"/>
      </CardHeader>
      <CardBody>
        <Auth
          providers={{
            github: {
          
              name: 'Github'
            },
            google: {
          
              name: 'Google'
            },
            facebook: {
       
              name: 'Facebook'
            }
          }}
          onSuccess={(view, error) => {
            if (view === 'login') {
              snackbar.success('Welcome back!')
              router.push('/dashboard')
            }
          }}
          onError={(view, error) => {
            if (view === 'login' && error) {
              snackbar.error(error.message)
            }
          }}
          redirectUrl={getAbsoluteUrl('/dashboard')}
        
        />

      </CardBody>
    </Card>
  );
};

export default SignUp;
