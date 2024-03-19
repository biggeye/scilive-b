'use server';

import { createClient } from "@/utils/supabase/service";

export async function uploadPrediction(
    content: string,
    userId: string,
    modelId: string,
    predictionId: string,
    prompt: string
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
        .upload(`${predictionId}`, imageBlob, {
            cacheControl: '3600',
            upsert: true
        });
    if (uploadResponse.error) {
        console.error('Supabase upload error:', uploadResponse.error);
        throw new Error('Error uploading image to Supabase');
    }
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${predictionId}`;
    console.log("new url created: ", url)
    const { data, error } = await supabase
    .from('master_content')
    .upsert({ prediction_id: predictionId, prompt: prompt, model_id: modelId, created_by: userId, url: url })
    .eq('prediction_id', predictionId);
  
  if (error) {
    console.error('Error updating image URL:', error.message);
  } else {
    // Check if the update was successful
    if (data) {
      console.log(`Image URL updated via uploadPrediction.ts: ${data}`);
    } else {
      console.log('No data returned after updating image URL');
    }
  }

/*
    try {
        console.log(`Updating Supabase with new URL ((${url})) for predictionId: ((${predictionId}))`);
        const { data, error } = await supabase
            .from('master_content')
            .upsert({ url: url })
            .eq('prediction_id', predictionId);

        if (error) {
            console.error('Error updating prediction data in Supabase:', error);
            throw new Error('Error updating prediction data in Supabase');
        }
        console.log('Database updated successfully with new content URL.');
    } catch (updateError) {
        console.error('Fallback to insert due to:', updateError);
        const { data, error } = await supabase
            .from('master_content')
            .insert([{
                created_by: userId,
                prediction_id: predictionId,
                url: url
            }]);

        if (error) {
            console.error('Error inserting prediction data in Supabase:', error);
            throw new Error('Error inserting prediction data in Supabase');
        }  */

    return url;
}
