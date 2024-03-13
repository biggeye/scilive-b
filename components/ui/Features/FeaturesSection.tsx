'use client'
import React from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react';
import { Parallax } from 'react-scroll-parallax';

const placeholderImages = {
  transform: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/transform.png`,
  inspire: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/inspire.png`,
  activate: `${process.env.NEXT_PUBLIC_DEFAULT_URL}/activate2.png`,
};
const headings = [
  { title: "AI-powered", bg: '' },
  { title: "Creative Suite", bg: placeholderImages.activate },
  { title: "activate", bg: placeholderImages.transform },
  { title: "transform", bg: placeholderImages.transform },
  { title: "inspire", bg: placeholderImages.inspire },
];
const FeaturesSection = () => {
  return (
      {headings.map((heading: any, index: any) => (
          <div key={index}>
              <Box
                ref={parallax as {React.RefObject}}
                bgImage={`url(${heading.bg})`}
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
              />
              <Heading>
                {heading.title}
              </Heading>
        </div>
        ))}
  );
};

export default FeaturesSection;