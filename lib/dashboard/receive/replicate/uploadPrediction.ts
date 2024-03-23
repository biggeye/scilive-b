'use server';

import { createClient } from "@/utils/supabase/service";

export async function uploadPrediction(
  content: string,
  userId: string,
  modelId: string,
  predictionId: string,
  prompt: string,
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
  const fileName = await uploadResponse.data.path;
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${fileName}`;
  console.log("new url created: ", url)


  const { data, error } = await supabase
    .from('prediction_content')
    .insert([{ url: url, prediction_id: predictionId }]);
  if (data) {
    console.log('Image URL inserted to prediction_content: ', url);
  }

  if (error) {
    console.error('Error inserting image URL to prediction_content table: ', error.message);

  } else {
    const { data, error } = await supabase
      .from('master_content')
      .upsert(({ prompt: prompt, prediction_id: predictionId, model_id: modelId, created_by: userId }))
    if (data) {
      console.log(`master_content table updated via uploadPrediction.ts: ${data}`);


    } else {
      console.log('No data returned after inserting image URL');
    }
  }
  return url;
}
