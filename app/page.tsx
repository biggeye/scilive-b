'use client'
import React from 'react';
import { Image, Link, VStack } from '@chakra-ui/react';
import OpeningSequence from '@/components/ui/Features/OpeningSequence';

const HomePage = () => {
  return (
   <VStack>
    <Image src="/scilive4.png" />
        <OpeningSequence />

    <Link href="/signin">Sign In</Link>
    </VStack>
  )
}
export default HomePage;