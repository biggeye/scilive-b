'use client'
import { useState, useEffect, useMemo } from 'react';
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

  const galleryItems = useMemo(() => fetchGalleryItems(), []);

  useEffect(() => {
    galleryItems.then(data => setContentItems(data));
  }, [galleryItems]);

  const handleEdit = async (id: string) => {
    console.log('Edit item with id:', id);
    try {
      const response = await fetch(id);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const fileBlob = await response.blob();
        const dataURI: any = await convertToDataURI(new File([fileBlob], "filename")); // You may need to adjust "filename" and possibly provide a MIME type
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
  

  const handleDelete = async (contentId: string) => {
    console.log('Delete item with contentId:', contentId);
    try {
        // Step 1: Find the record in the items_test table to get the URL
        const { data: itemData, error: itemError } = await supabase
            .from('items_test')
            .select('url')
            .eq('content_id', contentId)
            .single();

        if (itemError) throw new Error(`Error finding item: ${itemError.message}`);
        if (!itemData) throw new Error('Item not found.');

        const filePath = itemData.url.split('/').pop();

        // Step 2: Delete the image from Supabase Storage
        const { error: deleteError } = await supabase.storage
            .from('production2024')
            .remove([filePath]);

        if (deleteError) throw new Error(`Error deleting image from storage: ${deleteError.message}`);

        // Step 3: Delete the record from the items_test table
        const { error: deleteItemError } = await supabase
            .from('items_test')
            .delete()
            .match({ 'content_id': contentId });

        if (deleteItemError) throw new Error(`Error deleting item record: ${deleteItemError.message}`);

        // Step 4: Update UI by filtering out the deleted item
        setContentItems(prevItems => prevItems.filter(item => item.content_id !== contentId));

        console.log('Item successfully deleted.');

    } catch (error) {
        console.error('Failed to delete item:', error);
    }
};


  return { contentItems, setContentItems, handleEdit, handleDelete };
};
