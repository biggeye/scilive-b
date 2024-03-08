'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/lib/userClientSide';
import { Button } from '@chakra-ui/react';

export default function SignOut() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { supabase } = getUserProfile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <Button
    padding={".5px"}
    mt={2}
    
    type="submit"
    onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}