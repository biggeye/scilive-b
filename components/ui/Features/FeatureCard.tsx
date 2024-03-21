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
  title: string;
  text: string;
  imgSrc: string | null;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, text, imgSrc }) => {
  return (
    <Card p={9} mt={4} className="FeatureCard" bgGradient='linear-gradient(145deg, primary.50 0%, gray.400 100%)' boxShadow="md">

      <Tooltip label={title}>
        <VStack
          spacing={4}
          align="start"
          className="element-fade-in"
        >
          {imgSrc ? (
            <Image display={{ base: "none", md: "flex" }} borderRadius="md" src={imgSrc} alt={title} objectFit="cover" className="doogieVibe" />
          ) : (
            <Box bgImage="/scilive.svg" opacity="50%"/>
          )}
          <Heading size="md">{title}</Heading>
          <Text>{text}</Text>
        </VStack>
      </Tooltip>

    </Card>
  );
};

export default FeatureCard