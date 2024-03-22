'use server';

import { createClient } from "@/utils/supabase/service";

export async function uploadPrediction(
    content: string,
    userId: string,
    modelId: string,
    predictionId: string,
    prompt: string,
    contentId: string
): Promise<string> {

    const supabase = createClient();
    const response = await fetch(content);
    if (!response.ok) {
        console.error('Failed to fetch content from URL:', content, 'Response status:', response.status);
        throw new Error(`Error fetching the content from URL: ${content}`);
    }
    const imageBlob = await response.blob();
    const uploadResponse = await supabase.storage
        .from('production')
        .upload(`${contentId}`, imageBlob, {
            cacheControl: '3600',
            upsert: true
        });
    if (uploadResponse.error) {
        console.error('Supabase upload error:', uploadResponse.error);
        throw new Error('Error uploading image to Supabase');
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${contentId}`;
    console.log("new url created: ", url)
    const { data, error } = await supabase
    .from('supplementary_content')
    .insert([{ url: url, prediction_id: predictionId, content_id: contentId }]);
  
  if (error) {
    console.error('Error inserting image URL:', error.message);
  } else {
    // Check if the insert was successful
    if (data) {
      console.log(`Image URL inserted via uploadPrediction.ts: ${data}`);
    } else {
      console.log('No data returned after inserting image URL');
    }
  }
    return url;
}
