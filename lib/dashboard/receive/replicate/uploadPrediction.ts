'use server'
import { createClient } from "@/utils/supabase/server";

export async function uploadPrediction(
  content: string,
  predictionId: string
): Promise<string> {
  const supabase = createClient();

  try {

    console.log("Fetching content from URL:", content);
    const predictionOutput = await fetch(content);

    if (!predictionOutput.ok) {
      throw new Error(`Failed to fetch content from URL: ${content}, Response status: ${predictionOutput.status}`);
    }

    console.log("Converting fetched content to Blob...");
    const imageBlob = await predictionOutput.blob();
    console.log("Blob created:", imageBlob);
     const upload = await imageBlob;

    console.log("Uploading Blob to Supabase storage...", predictionId);
    const uploadResponse = await supabase.storage.from('production2024').upload(`${predictionId}`, upload);
    console.log("Upload response:", uploadResponse);

    if (uploadResponse.error) {
      throw new Error(`Supabase upload error: ${uploadResponse.error}`);
    }

    const fileName = uploadResponse.data?.path;

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${fileName}`;
    console.log("Generated URL for the uploaded file:", url);

    console.log("Inserting URL and prediction_id into 'items' table...");
    const { data, error } = await supabase
      .from('items')
      .insert({ url: url, prediction_id: predictionId });
    console.log("Insertion response:", data, error);

    if (error) {
      console.error('Error inserting image URL to items table: ', error.message);
    } else {
      console.log('Image URL inserted to items table: ', url);
    }

    return url;
  } catch (error) {
    console.error('Error during uploadPrediction:', error);
    throw new Error('Error during uploadPrediction');
  }
}
