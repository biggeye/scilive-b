// DetailsPanel.jsx
import React from 'react';
import { Box, VStack, Text, Input, Button } from '@chakra-ui/react';
import { fetchGalleryImages } from '@/lib/galleryServer';

export const DetailsPanel = () => {

const selectedObject = {
  name: "hi"
}

  return (
    <VStack spacing={4} p={4}>
      <Text>{selectedObject.name}</Text>
      {/* Render details for the selected object */}
      <Input value={selectedObject.width} placeholder="Width" />
      <Input value={selectedObject.height} placeholder="Height" />
      {/* More inputs and controls as necessary */}
      <Button>Update</Button>
    </VStack>
  );
};
