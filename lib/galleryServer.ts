'use server'; 

import { createClient } from "@/utils/supabase/server";
import { GalleryItem } from "@/types";

const supabase = createClient();

let cachedGalleryItems: any = null;

export async function fetchGalleryItems() {
  if (cachedGalleryItems) {
    return cachedGalleryItems;
  }

  const { data: masterData, error: masterError } = await supabase
    .from('master_with_url_test')
    .select('*');

  if (masterError) {
    console.error("Error fetching master content: ", masterError);
    throw new Error('Supabase - Master Content Fetch Error');
  }

  const galleryItems = await masterData;

  cachedGalleryItems = galleryItems;
  return cachedGalleryItems as GalleryItem;
}
