'use client'
import React, { useState, useEffect } from 'react';
import { Box, Spacer, Image, Link, VStack } from '@chakra-ui/react';
import OpeningSequence from '@/components/ui/Features/OpeningSequence';
import { fetchGalleryImages } from '@/lib/galleryServer';

const HomePage = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const galleryImages = await fetchGalleryImages();
      setUrls(galleryImages.map(image => image.url));
    };
    fetchImages();
  }, []);

  return (

 <Box display="flex" justifyContent="space-between" zIndex="10000" padding="25px" borderRadius="lg" boxShadow="xl" bgGradient="linear(to-r, primary.50, primary.300, transparent)">
    <Image height="40px" src="/scilive4.png" className="Logo" />
    
        <Spacer />
        <Link href="/signin">Sign In</Link>
        </Box>
        

  )
}
export default HomePage;
