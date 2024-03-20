'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';

export default function SignUpButton() {

  const router = useRouter();
  async function handleSignUp() {
    router.push('/signin')
  }

  return (
    <Button
      borderRadius="xl"
      borderWidth=".5px"

      bgGradient="linear(to-b, gray.300,  gray.200 )" // add linear gradient syntax
      width="100%"
      padding="5px"
      mt={2}

      type="submit"
      onClick={handleSignUp}>
      <h3>
        Create Account / Login
      </h3>
    </Button>

  )
}