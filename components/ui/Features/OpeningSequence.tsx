import React, { useState, useEffect } from 'react';
import { Image, Box } from "@chakra-ui/react";
import '../../../app/main.css';

const OpeningSequence = ({ imageUrls }: any) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % imageUrls.length);
    }, 50000);
    return () => clearInterval(timer);
  }, [imageUrls]);

  return (
    <Box opacity="100%" position="fixed" top="55px" width="100vw">

      <Box className="element2-fade-in-out" position="absolute" left="35px" top="50px" width="30%" maxHeight="60vh">
        <Image borderRadius="xl" boxShadow="xxl" src={imageUrls[currentImage]} alt="slideshow" />
      </Box>
      <Box className="element-fade-in-out" position="absolute" right="50px" top="50px" width="30%" maxHeight="60vh">
        <Image borderRadius="xl" boxShadow="xxl" src={imageUrls[(currentImage + 1) % imageUrls.length]} alt="slideshow" />
      </Box>
      
    </Box>
  );
};

export default OpeningSequence;
