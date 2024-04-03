'use strict';
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

    const imageBlob = await predictionOutput.blob();
    const { data, error } = await supabase.storage.from('production2024').upload(`${predictionId}`, imageBlob);
    if (error) {
      throw new Error(`Supabase upload error: ${error.message}`);
    }

    const fileName = data?.path;
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production2024/${fileName}`;
    console.log("Generated URL for the uploaded file:", url);
    console.log("Inserting URL and prediction_id into 'items' table...");

    const { data: insertData, error: insertError } = await supabase
      .from('items_test')
      .insert({ url: url, prediction_id: predictionId });

    if (insertError) {
      console.error('Error inserting image URL to items table: ', insertError.message);
      throw insertError;
    } else {
      console.log('Image URL inserted to items table: ', url);
    }

    return url;
  } catch (error) {
    console.error('Error during uploadPrediction:', error);
    throw error;
  }
}
