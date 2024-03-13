'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';

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
    <Button
    width="100%"
    padding={".5px"}
    mt={2}

    type="submit"
    onClick={handleSignUp}>
<h3>
      Register
</h3>
    </Button>
  )
}