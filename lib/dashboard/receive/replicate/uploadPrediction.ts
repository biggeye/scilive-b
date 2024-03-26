'use server'
import { createClient } from "@/utils/supabase/server";

export async function uploadPrediction(
  content: string,
  predictionId: string
): Promise<string> {
  const supabase = createClient();

  try {
    // Fetch content from the provided URL
    console.log("Fetching content from URL:", content);
    const predictionOutput = await fetch(content);

    if (!predictionOutput.ok) {
      throw new Error(`Failed to fetch content from URL: ${content}, Response status: ${predictionOutput.status}`);
    }

    // Convert the fetched content to a Blob
    console.log("Converting fetched content to Blob...");
    const imageBlob = await predictionOutput.blob();
    console.log("Blob created:", imageBlob);

    // Upload the Blob to Supabase storage
    console.log("Uploading Blob to Supabase storage...", predictionId);
    const uploadResponse = await supabase.storage
      .from('production2024')
      .upload(`${predictionId}`, imageBlob, {
        cacheControl: '3600',
        upsert: true
      });
    console.log("Upload response:", uploadResponse);

    if (uploadResponse.error) {
      throw new Error(`Supabase upload error: ${uploadResponse.error}`);
    }

    // Get the file name from the upload response
    const fileName = uploadResponse.data?.path;

    // Generate the URL for the uploaded file
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${fileName}`;
    console.log("Generated URL for the uploaded file:", url);

    // Insert the URL and prediction_id into the 'items' table
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
