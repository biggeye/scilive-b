'use client'
import React, { useState, useEffect } from 'react';
import { Stack, Button, HStack, Box, Spacer, Image, Link, VStack, Text, Grid, Flex } from '@chakra-ui/react';
import { useAuth } from '@saas-ui/auth';
import { useRouter } from 'next/navigation';
import { GitHubLogo } from '@/public/logos';
const HomePage = () => {
  const auth = useAuth();
  const router = useRouter();
  const features =
    [{
      key: "01",
      title: "Content Creation",
      description: "A curated set of multi-modal generators and editors",
      image: "https://scilive.cloud/features/transform.png",
    },
    {
      key: "02",
      title: "Avatar Workshop",
      description: "Create an avatar from scratch, or customize and edit your own images to create the perfect online image",
      image: "https://scilive.cloud/features/activate2.png",
    },
    {
      key: "03",
      title: "Social Media Syndication",
      description: "Reduce repetitive regimen with syndicated publishing capabilities",
      image: "https://scilive.cloud/features/inspire.png",
    },
    {
      key: "04",
      title: "Go Live!",
      description: "Bring your show to your audience with high quality assets right by your side",
      image: "https://scilive.cloud/features/studio.jpeg"
    }]
  const roadmap = [{
    date: "",
    feature: ""
  }];

  // Add your roadmap array here

  useEffect(() => {
    if (auth.user) {
      router.push('/prod');
    }
  }, [auth]);


  return (
    <VStack>
      <Box position="relative" w="100%" h="100vh" bgImage="url('https://scilive.cloud/sciLive.png')" bgAttachment="fixed">
        <VStack spacing={5} position="relative" top="50%" transform="translateY(-50%)" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" color="white"></Text>
          <Text fontSize="xl" color="gray.200">sciLive.cloud</Text>
          <HStack spacing={4}>
            <Button colorScheme="teal" size="lg">Get Started</Button>
            <Button colorScheme="gray" size="lg" onClick={() => window.scrollTo({ top: document.body.offsetHeight, behavior: 'smooth' })}>Learn More</Button>
          </HStack>
        </VStack>
      </Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {features.map(feature => (
          <Box bg="white" p={6} rounded="md" boxShadow="lg" style={{ transform: 'translateY(-50px)' }}>
            <Text fontSize="2xl" fontWeight="bold">{feature.title}</Text>
            <Text>{feature.description}</Text>
            <Image src={feature.image} />
            <Button mt={4} onClick={() => router.push(`/demo/${feature.key}`)}>Try It Now</Button>
          </Box>
        ))}
      </Grid>
      <VStack spacing={8} w="full">
        <Text fontSize="3xl" fontWeight="bold" pb={4}>Roadmap</Text>
        {roadmap.map(item => (
          <HStack key={item.date} w="full" justifyContent="space-between" p={5} bg="gray.100" rounded="lg">
            <Text fontWeight="semibold">{item.date}</Text>
            <Text>{item.feature}</Text>
          </HStack>
        ))}
      </VStack>
      <Flex as="footer" py="8rem" align="center" justify="space-between">
        <Text>&copy; {new Date().getFullYear()} SciLive</Text>
        <Stack direction="row" spacing={6}>
          <Link href="https://github.com/biggeye/scilive-b"><GitHubLogo /></Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </Stack>
      </Flex>
    </VStack>
  )
}
export default HomePage;
