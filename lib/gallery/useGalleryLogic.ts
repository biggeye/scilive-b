'use client'
import { parseGalleryImages } from '@/lib/gallery/getGalleryItems';
import { ContentItem } from '@/types';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';
import { userImagePreviewState } from '@/state/replicate/prediction-atoms'

export const useGalleryLogic = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const data = await parseGalleryImages();
      setContentItems(data.flat()); // Assuming parseGalleryImages returns ContentItem[][]
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
    const filteredItems = contentItems.filter(item => item.content_id !== id);
    setContentItems(filteredItems);
  };

  return { contentItems, handleEdit, handleDelete };
};
