'use client'
import React from 'react';
import StripeWidget from '@/components/ui/Pricing/StripeWidget';
import FeaturesSection from '@/components/ui/Features/FeaturesSection';
import {VStack } from '@chakra-ui/react';

const HomePage = () => {
  return (
   <VStack>
        <FeaturesSection />
        <StripeWidget />
    </VStack>
  )
}
export default HomePage;