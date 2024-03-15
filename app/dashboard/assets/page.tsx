'use client';
import React, { useEffect, useState } from 'react';

// import UI
import { Card, Box } from '@chakra-ui/react';
// import utility
import { createClient } from '@/utils/supabase/client';
import { useGalleryLogic } from '@/lib/gallery/useGalleryLogic';
import { useRecoilState, useRecoilValue } from 'recoil';

// import state

import Gallery from '@/components/Gallery';


const GalleryPage: React.FC = () => {
  const { contentItems, setContentItems, handleEdit, handleDelete } = useGalleryLogic();



  return (

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

  );
};

export default GalleryPage;
