'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
export default function SignUpButton() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  async function handleSignUp() {
    router.push('/signin')
  }

  return (
    <Flex direction="row">
      <Spacer />
    <Button
    width="100%"
    padding={".5px"}
    mt={2}

    type="submit"
    onClick={handleSignUp}>
<h3>
      Create Account / Login
</h3>
    </Button>
    <Spacer />
    </Flex>
  )
}