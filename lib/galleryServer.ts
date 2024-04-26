'use client';

import { createClient } from "@/utils/supabase/client";
import { GalleryItem } from "@/types";

const supabase = createClient();

let cachedGalleryItems: GalleryItem[] | null = null;

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
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

  cachedGalleryItems = masterData as GalleryItem[];
  return cachedGalleryItems;
}
