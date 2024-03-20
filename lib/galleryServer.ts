'use server'
import { createClient } from "@/utils/supabase/server";
import { GalleryImage, GalleryScript } from '@/types';

const supabase = createClient();

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
    try {
        // Include a filter where 'url' is not null to ensure only rows with images are selected
        const { data, error } = await supabase
            .from('master_content')
            .select('content_id, url, prompt, created_at')
            .not('url', 'is', null); // This ensures only rows where 'url' is not null are selected

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error fetching images from gallery: ", error);
        throw new Error('Supabase - Image Fetch Error');
    }
}


export async function fetchGalleryScripts(): Promise<GalleryScript[]> {
    try {
        // Include a filter where 'content' is not null to ensure only rows with content are selected
        const { data, error } = await supabase
            .from('master_content')
            .select('content_id, created_at, content, prompt')
            .not('content', 'is', null); // This ensures only rows where 'content' is not null are selected

        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error fetching scripts from gallery: ", error)
        throw new Error('Supabase - Script Fetch Error');
    }
}

