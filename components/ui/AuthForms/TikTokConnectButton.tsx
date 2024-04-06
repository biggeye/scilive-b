// TikTokConnectButton.tsx
'use client'
import React from 'react';
import { Button } from '@chakra-ui/react';

const TikTokConnectButton = () => {
  const handleTikApiSignIn = () => {
    // Assuming NEXT_PUBLIC_TIKAPI_OAUTH_LINK is defined in your .env
    window.location.href = `${process.env.NEXT_PUBLIC_TIKAPI_OAUTH_LINK}`;
  };

  return (
    <Button colorScheme="blue" onClick={handleTikApiSignIn}>
      Connect to TikTok
    </Button>
  );
};

export default TikTokConnectButton;
