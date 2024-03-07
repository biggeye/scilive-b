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

const placeholderImages = {
  imageCreation: 'https://scilive.cloud/IMG_2636.jpeg',
  videoCreation: 'https://scilive.cloud/IMG_2637.jpeg',
  avatarTraining: 'https://scilive.cloud/IMG_2635.jpeg',
};

interface FeatureCardProps {
  title: string;
  text: string;
  imgSrc: string | null;
  list: JSX.Element | null;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, text, imgSrc, list }) => {
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

const features = [
  {
    title: "Image Creation",
    text: "Our Image Creation module offers a user-friendly interface with drag-and-drop functionality, enabling swift editing and customization of images.",
    imgSrc: placeholderImages.imageCreation,
    list: (
      <Box p={9} mt={4}>
        <ol>
          <li><b>Drag & Drop Editing</b>: Easily adjust, resize, and apply filters to images with intuitive drag-and-drop controls.</li>
          <li><b>Multiple Text-to-Image Models</b>: Access a variety of text-to-image models, allowing for diverse and creative outputs based on textual descriptions.</li>
          <li><b>User Gallery</b>: Automatically save every creation to your personal gallery, ensuring easy management and access to all your work.</li>
        </ol>
      </Box>
    )
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
    list: (
      <Box p={9} mt={4}>
        <ol>
          <li><b>Voice Cloning and Avatar Creation</b>: Clone voices and create avatars to produce personalized voiceovers and visual representations.</li>
          <li><b>Background Customization</b>: Select from a range of backgrounds or upload your own to tailor videos to specific themes or narratives.</li>
          <li><b>Integrated Editing Suite</b>: Utilize our comprehensive editing suite for video adjustments, ensuring seamless integration of voice and visuals.</li>
        </ol>
      </Box>
    )
  }
]

const FeaturesSection = () => (
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
            list={feature.list}
          />
        ))}
      </SimpleGrid>
    </VStack>
  </Container>
);

export default FeaturesSection;
