'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Gallery from '@/components/Gallery';
import { Card, Box } from '@chakra-ui/react';
import { fetchGalleryImages, fetchGalleryScripts } from '@/lib/galleryServer';

import { ContentItem } from '@/types';

const GalleryPage: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [imagesData, scriptsData] = await Promise.all([
        fetchGalleryImages(),
        fetchGalleryScripts(),
      ]);

      // Combine images and scripts data into a single array
      const combinedData = [...imagesData, ...scriptsData];
      setContentItems(combinedData);
    };

    fetchData();
  }, []);

  // Handler for edit action - stub for now
  const handleEdit = (id: string) => {
    console.log('Edit item with id:', id);
    // Implement edit logic here
  };

  // Handler for delete action - stub for now
  const handleDelete = async (id: string) => {
    console.log('Delete item with id:', id);
    // Implement delete logic here
    // Example: Remove item from contentItems state after deletion
    const filteredItems = contentItems.filter(item => item.content_id !== id);
    setContentItems(filteredItems);
  };

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
