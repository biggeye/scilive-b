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
    list: ["Drag & Drop Editing: Easily adjust, resize, and apply filters to images with intuitive drag-and-drop controls.", 
    "Multiple Text-to-Image Models: Access a variety of text-to-image models, allowing for diverse and creative outputs based on textual descriptions.", 
    "User Gallery: Automatically save every creation to your personal gallery, ensuring easy management and access to all your work."]
  },
  {
    title: "Avatar Training",
    text: "Create a personalized model with just four pictures using our SDXL technology.",
    imgSrc: placeholderImages.avatarTraining,
    list: null
  },
  {
    title: "Video Creation",
    text: "The Video Creation tool simplifies the production of talking head videos through advanced technologies:",
    imgSrc: placeholderImages.videoCreation,
    list: ["Voice Cloning and Avatar Creation: Clone voices and create avatars to produce personalized voiceovers and visual representations.", 
    "Background Customization: Select from a range of backgrounds or upload your own to tailor videos to specific themes or narratives.", 
    "Integrated Editing Suite: Utilize our comprehensive editing suite for video adjustments, ensuring seamless integration of voice and visuals."]
  }
]

const FeaturesSection = () => {
  return(
  <Container maxW="container.xl" py={10} className="fade-in-from-top">
    <VStack spacing={5}>
      <Heading as="h2" size="xl" textAlign="center">
        Explore the Future of Digital Creation
      </Heading>
      <Text textAlign="center" maxW="3xl">
        Dive into a world where your creativity knows no bounds with sciLive, your ultimate platform for digital creation.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            text={feature.text}
            imgSrc={feature.imgSrc}
            list={feature.list && feature.list.map(item => <li><b>{item}</b></li>)}
          />
        ))}
      </SimpleGrid>
    </VStack>
  </Container>
  )
};
export default FeaturesSection;
