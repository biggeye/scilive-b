'use client'
import React from 'react';
import StripeWidget from '@/components/ui/Pricing/StripeWidget';
import FeaturesSection from '@/components/ui/Features/FeaturesSection';
import {VStack } from '@chakra-ui/react';
import SignUpButton from '@/components/ui/AuthForms/SignUpButton';

const HomePage = () => {
  return (
   <VStack>
        <SignUpButton />
        <FeaturesSection />
        <StripeWidget />
    </VStack>
  )
}
export default HomePage;