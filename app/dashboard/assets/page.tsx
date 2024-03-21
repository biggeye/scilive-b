'use client';
import React, { useEffect, useState } from 'react';
import { useGalleryLogic } from '@/lib/gallery/useGalleryLogic';
import Gallery from '@/components/Gallery';
import { Box } from '@chakra-ui/react';

const GalleryPage: React.FC = () => {
  const { contentItems, setContentItems, handleEdit, handleDelete } = useGalleryLogic();

  return (
    <Box 
    width="90%"
    margin="10px"
    >

    <Gallery
      items={contentItems.map(item => ({
        id: item.content_id,
        url: item.url,
        title: item.title,
        prompt: item.prompt,
        content: item.content, // Include content here
      }))}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
    </Box>
  );
};

export default GalleryPage;
