// /lib/galleryServer.ts

'use server'; // Should this be 'use strict'?

import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

let cachedGalleryImages: any = null;

export async function fetchGalleryImages() {
  if (cachedGalleryImages) {
    return cachedGalleryImages;
  }

  const { data: masterData, error: masterError } = await supabase
    .from('master_with_url')
    .select('*');

  if (masterError) {
    console.error("Error fetching master content: ", masterError);
    throw new Error('Supabase - Master Content Fetch Error');
  }

  cachedGalleryImages = masterData; // Remove 'const' to update module-level variable
  return cachedGalleryImages;
}
