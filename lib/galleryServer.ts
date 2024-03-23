// /lib/galleryServer.ts

'use server'; // Should this be 'use strict'?

import { createClient } from "@/utils/supabase/server";
import { GalleryImage } from '@/types';

const supabase = createClient();

let cachedGalleryImages: GalleryImage[] | null = null;

/**
 * Fetches supplementary data (URLs) for a given prediction_id.
 * @param predictionId The prediction_id for which to fetch supplementary data.
 * @returns {Promise<string[]>} A promise that resolves to an array of URLs.
 */
const fetchSupplementaryData = async (predictionId: string): Promise<string[]> => {

  const { data, error } = await supabase
    .from('prediction_content')
    .select('url')
    .like('prediction_id', predictionId);

  if (error) {
    console.error("Error fetching URLs for prediction_id: ", predictionId, error);
    throw new Error('Supabase - URL Fetch Error');
  }

  return data.map(item => item.url);
}

/**
 * Fetches gallery images from the database.
 * @returns {Promise<GalleryImage[]>} A promise that resolves to an array of gallery images.
 */
export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  if (cachedGalleryImages !== null) {
    return cachedGalleryImages;
  }
  
  try {
    const { data: masterData, error: masterError } = await supabase
      .from('master_content')
      .select('content_id, prediction_id, prompt, created_at, created_by');

    if (masterError) {
      console.error("Error fetching master content: ", masterError);
      throw new Error('Supabase - Master Content Fetch Error');
    }

    const galleryImages: GalleryImage[] = [];
    for (const item of masterData) {
      const urls = await fetchSupplementaryData(item.prediction_id);
  
      // Create a new GalleryImage for each URL
      for (const url of urls) {
        galleryImages.push({
          content_id: item.content_id,
          prediction_id: item.prediction_id,
          prompt: item.prompt,
          created_at: item.created_at,
          created_by: item.created_by,
          url: url,
        });
      }
    }

    cachedGalleryImages = galleryImages;

    console.log("return of cachedGalleryImages: ", cachedGalleryImages)
    return cachedGalleryImages;
  } catch (error) {
    console.error("Error fetching images from gallery: ", error);
    throw new Error('Supabase - Image Fetch Error');
  }
}

