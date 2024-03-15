'use client'
import React from 'react';
import StripeWidget from '@/components/ui/Pricing/StripeWidget';
import FeaturesSection from '@/components/ui/Features/FeaturesSection';
import { Box, VStack } from '@chakra-ui/react';
import SignUpButton from '@/components/ui/AuthForms/SignUpButton';
import OpeningSequence from '@/components/ui/Features/OpeningSequence';

const HomePage = () => {
  return (
   <VStack>
        <OpeningSequence />
     
        <SignUpButton />
    </VStack>
  )
}
export default HomePage;