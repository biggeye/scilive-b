'use client'
import React, { useState, useEffect } from 'react';
import { Box, Spacer, Image, Link, VStack } from '@chakra-ui/react';
import OpeningSequence from '@/components/ui/Features/OpeningSequence';
import { fetchGalleryImages } from '@/lib/galleryServer';

const HomePage = () => {

  return (

    <Box display="flex" 
    justifyContent="space-between" 
    zIndex="10000" 
    borderBottomLeftRadius="17px" 
    borderColor="primary.300" 
    borderBottomWidth="1px"
    borderTopWidth="0px"
    borderRightWidth="0px"
    padding="7px" 
    boxShadow="1px 3px 2px rgba(0, 0, 0, 0.22)" 
    bgGradient="linear(to-r, primary.50, primary.300, transparent)">

      <Image height="40px" src="/scilive4.png" className="Logo" />
      <Spacer />
      <Link href="/signin">Sign In</Link>
    </Box>


  )
}
export default HomePage;
