'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@chakra-ui/react';

export default function SignOutButton() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    router.push('/signin')
  }

  return (
    <Button
    width="100%"
    padding={".5px"}
    mt={2}

    type="submit"
    onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}