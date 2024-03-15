import React from 'react';
import { Text, Box, Card } from '@chakra-ui/react';
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
  const featureBgParallax = useParallax({
    scale: [0.1, 1.5],
  });

  return (
    <Box
      w="100vw"
      h="100vh"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      justifyContent="center"
      backgroundImage={featureImages}
      ref={featureBgParallax.ref as React.RefObject<HTMLDivElement>}>

      {welcome.map((feature) => (
        <>
        <Card
            borderRadius="xl"
            key={feature.welcomeKey}
            w="100vw"
            h="10%"
            backdropFilter="blur(50px)"
            backgroundSize="cover"
            left={feature.position}
            top={feature.position}

            alignItems="center"
            position="absolute"
          />
          <Box
            position="relative"
            left={feature.position}
            top={feature.position}
          >
            <Text
              as="h1"
              fontSize="40px"
              color="primary.900"
            >
              {feature.title}
            </Text>
          </Box>
        </>
      ))}
    </Box>
  );
};

export default FeaturesSection;
