'use client'
import { parseGalleryImages } from '@/lib/gallery/getGalleryItems';
import { ContentItem } from '@/types';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';
import { convertToDataURI } from '@/utils/convertToDataURI';
import { userImagePreviewState, userImageDataUriState } from '@/state/replicate/prediction-atoms'
import { fetchGalleryImages } from '@/lib/galleryServer';
import { contentItemsState } from '@/state/user/gallery-atoms';
import { useRouter } from 'next/navigation';

export const useGalleryLogic = () => {
  const [contentItems, setContentItems] = useRecoilState(contentItemsState);
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const [imagesData] = await Promise.all([
        fetchGalleryImages(),
      ]);
      const combinedData = [...imagesData];
      setContentItems(combinedData);
    };
    fetchData();
  }, []);

  const handleEdit = async (id: string) => {
    console.log('Edit item with id:', id);
    try {

      // Assuming 'id' is a URL to a file (e.g., an image)
      const response = await fetch(id);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Assuming the response is a Blob (e.g., an image file)
      const fileBlob = await response.blob();
      // Convert the Blob to a Data URI
      const dataURI = await convertToDataURI(new File([fileBlob], "filename")); // You may need to adjust "filename" and possibly provide a MIME type
  
      setUserImagePreview(dataURI); // Assuming setUserImagePreview expects a Data URI
      router.push("/dashboard/edit-image");
    } catch (error) {
      console.error("Failed to edit item:", error);
      // Handle the error appropriately in your UI
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
