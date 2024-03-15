'use client'
import { parseGalleryImages } from '@/lib/gallery/getGalleryItems';
import { ContentItem } from '@/types';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';
import { userImagePreviewState } from '@/state/replicate/prediction-atoms'
import { fetchGalleryImages, fetchGalleryScripts } from '@/lib/galleryServer';
import { contentItemsState } from '@/state/user/gallery-atoms';

export const useGalleryLogic = () => {
  const [contentItems, setContentItems] = useRecoilState(contentItemsState);
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const [imagesData, scriptsData] = await Promise.all([
        fetchGalleryImages(),
        fetchGalleryScripts(),
      ]);
      const combinedData = [...imagesData, ...scriptsData];
      setContentItems(combinedData);
    };
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    console.log('Edit item with id:', id);
    setUserImagePreview(id);
  };

  const handleDelete = async (id: string) => {
    console.log('Delete item with id:', id);
    // Implement delete logic here
    // Example: Remove item from contentItems state after deletion
   // const filteredItems = contentItems.filter(item => item.content_id !== id);
   // setContentItems(filteredItems);
  };

  return { contentItems, setContentItems, handleEdit, handleDelete };
};
