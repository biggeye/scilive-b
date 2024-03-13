'use client'
import React from 'react';
import {
  Box,
  Card,
  VStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Container,
  useStyleConfig,
  Tooltip
} from '@chakra-ui/react';
import FeatureCard from './FeatureCard';

const placeholderImages = {
  imageCreation: 'https://scilive.cloud/IMG_2636.jpeg',
  videoCreation: 'https://scilive.cloud/IMG_2637.jpeg',
  avatarTraining: 'https://scilive.cloud/IMG_2635.jpeg',
};

const features = [
  {
    title: "Image Creation",
    text: "Our Image Creation module offers a user-friendly interface with drag-and-drop functionality, enabling swift editing and customization of images.",
    imgSrc: placeholderImages.imageCreation,
  },
  {
    title: "Avatar Training",
    text: "Create a personalized model with just four pictures using our SDXL technology.",
    imgSrc: placeholderImages.avatarTraining,
  },
  {
    title: "Video Creation",
    text: "The Video Creation tool simplifies the production of talking head videos through advanced technologies:",
    imgSrc: placeholderImages.videoCreation,
  }
]

const FeaturesSection = () => {
  return (
    <Container maxW="container.xl" py={10} className="fade-in-from-top">
      <VStack spacing={5}>
        <h2>
          AI for today
        </h2>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {features.map((feature, index) => (

            <FeatureCard
              key={feature.title}
              title={feature.title}
              text={feature.text}
              imgSrc={feature.imgSrc}
            />

          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
};
export default FeaturesSection;
