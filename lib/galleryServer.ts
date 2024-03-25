// /lib/galleryServer.ts

'use server'; // Should this be 'use strict'?

import { createClient } from "@/utils/supabase/server";
import { GalleryImageView, UserProfile } from '@/types';
import { useAccountDetails } from "./user/useUserServer";

const supabase = createClient();
const userId = useAccountDetails();

let cachedGalleryImages: GalleryImageView[] | null = null;

export async function fetchGalleryImages(): Promise<GalleryImageView[]> {
  if (cachedGalleryImages) {
    return cachedGalleryImages;
  }

  const { data: masterData, error: masterError } = await supabase
    .from('prediction_urls')
    .select('url, friendly_name, prompt, created_at, created_by, prediction_id')

  if (masterError) {
    console.error("Error fetching master content: ", masterError);
    throw new Error('Supabase - Master Content Fetch Error');
  }

  const galleryImages: GalleryImageView[] = await masterData;

  cachedGalleryImages = galleryImages;
  return cachedGalleryImages;
}
