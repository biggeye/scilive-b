'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';
import { convertToDataURI } from '@/utils/convertToDataURI';
import { userImagePreviewState, userImageDataUriState } from '@/state/replicate/prediction-atoms'
import { fetchGalleryItems } from '@/lib/galleryServer';
import { contentItemsState } from '@/state/user/gallery-atoms';
import { useRouter } from 'next/navigation';

export const useGalleryLogic = () => {
  const [contentItems, setContentItems] = useRecoilState(contentItemsState);
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const [galleryItems] = await Promise.all([
        fetchGalleryItems(),
      ]);
      setContentItems(galleryItems);
    };
    fetchData();
  }, []);

  const handleEdit = async (id: string) => {
    console.log('Edit item with id:', id);
    try {
      const response = await fetch(id);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const fileBlob = await response.blob();
        const dataURI = await convertToDataURI(new File([fileBlob], "filename")); // You may need to adjust "filename" and possibly provide a MIME type
        if (dataURI) {
        setUserImagePreview(dataURI);
        setUserImageDataUri(dataURI); // Assuming setUserImagePreview expects a Data URI
        router.push("/prod/edit-image");
        } else {
          return null
        }
    } catch (error) {
      console.error("Failed to edit item:", error);
    }
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
