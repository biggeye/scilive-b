'use client'
import React from 'react';
import StripeWidget from '@/components/ui/Pricing/StripeWidget';
import FeaturesSection from '@/components/ui/Features/FeaturesSection';
import {Grid, GridItem } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Grid>
      <GridItem>
        <FeaturesSection />
      </GridItem>
      <GridItem>
        <StripeWidget />
      </GridItem>
    </Grid>
  )
}
export default HomePage;