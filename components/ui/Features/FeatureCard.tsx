'use client'
import {
    Card,
    VStack,
    Heading,
    Text,
    Image,
    Tooltip
  } from '@chakra-ui/react';

interface FeatureCardProps {
    title: string | null;
    text: string | null;
    imgSrc: string | null;
    list: JSX.Element | null;
  }
  
  const FeatureCard = ({ title, text, imgSrc, list }) => {
    return (
      <Card p={9} mt={4} className="FeatureCard" bgGradient='linear-gradient(145deg, teal.50 0%, gray.400 100%)' boxShadow="md">
        <VStack
          spacing={4}
          align="start"
          className="element-fade-in"
        >
          <Tooltip label={list}>
            {imgSrc ? (
              <Image display={{ base: "none", md: "flex" }} borderRadius="md" src={imgSrc} alt={title} objectFit="cover" className="featured-image-card" />
            ) : (
              <hr />
            )}
            <Heading size="md">{title}</Heading>
            <Text>{text}</Text>
          </Tooltip>
        </VStack>
      </Card>
    );
  };

  export default FeatureCard