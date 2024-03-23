// /lib/galleryServer.ts

'use server'; // Should this be 'use strict'?

import { createClient } from "@/utils/supabase/server";
import { GalleryImage} from '@/types';

const supabase = createClient();

let cachedGalleryImages: GalleryImage[] | null = null;

/**
 * Fetches gallery images from the database.
 * @returns {Promise<GalleryImage[]>} A promise that resolves to an array of gallery images.
 */
const fetchSupplementaryData = async (predictionData: any) => {
    const prediction = predictionData.prediction_id;
    const { data, error } = await supabase
      .from('prediction_content')
      .select('url')
      .eq('prediction_id', prediction);
  
    if (error) throw error;
    return data.map(item => item.url); // map the data array to an array of URLs
  }
  

  export async function fetchGalleryImages(): Promise<GalleryImage[]> {
    if (cachedGalleryImages !== null) {
      return cachedGalleryImages;
    }
    try {
      const { data, error } = await supabase
        .from('master_content')
        .select('content_id, prediction_id, prompt, created_at, created_by');
      if (error) throw error;
  
      const cachedGalleryImages = await Promise.all(data.map(async item => {
        const urls = await fetchSupplementaryData(item); // this is now an array of URLs
        return {
          ...item,
          urls, // include the array of URLs in the item
        };
      }));
  
      return cachedGalleryImages;
    } catch (error) {
      console.error("Error fetching images from gallery: ", error);
      throw new Error('Supabase - Image Fetch Error');
    }
  }
  

/**
 * Fetches gallery scripts from the database.
 * @returns {Promise<GalleryScript[]>} A promise that resolves to an array of gallery scripts.
 */
