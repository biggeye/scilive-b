'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import Gallery from '@/components/Gallery';
import { useGalleryLogic } from '@/lib/gallery/useGalleryLogic';

const GalleryPage: React.FC = () => {
  const { contentItems, handleEdit, handleDelete } = useGalleryLogic();

  return (
    <Box width="90%" margin="10px">
      <Gallery
        items={contentItems.map(item => ({
          content_id: item.content_id,
          model_id: item.model_id || 'unknown',
          url: item.url,
          script: item.script,
          friendly_name: item.friendly_name,
          content_type: item.content_type,
          title: item.title,
          prompt: item.prompt,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default GalleryPage;
