import React from 'react';
import { Text, Box, Card, Image } from '@chakra-ui/react';
import { useParallax } from 'react-scroll-parallax';
import SignUpButton from '../AuthForms/SignUpButton';
const featureImages = {
  transform: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/transform.png`,
  inspire: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/inspire.png`,
  activate: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/activate2.png`,
  sciLive: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/sciLive.png`,
  bg01: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/bg01.png`
};

const welcome = [
  { welcomeKey: '0', title: "Activate", bg: featureImages.activate, position: "05%", vPosition: "60%" },
  { welcomeKey: '1', title: "Transform", bg: featureImages.transform, position: "22%", vPosition: "20%" },
  { welcomeKey: '2', title: "Inspire", bg: featureImages.inspire, position: "44%", vPosition: "75%" },
];

const FeaturesSection = () => {


  return (
    <Card>
       <Box 
       className="element-fade-in-long"
       width="300px"
       height="300px"
       borderRadius="lg">
       <Image 
       borderRadius="xl"
       fit="cover"
       className="animated-shadow"
       src={featureImages.transform} />
       </Box>
       
          </Card>
  );
};

export default FeaturesSection;
