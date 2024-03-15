'use server';

import { createClient } from "@/utils/supabase/service";
import { cookies } from "next/headers";

export async function uploadPrediction(
    content: string,
    userId: string,
    modelId: string,
    predictionId: string,
    prompt: string
): Promise<string> {

    console.log("Starting uploadPrediction with content URL:", content);
    const supabase = createClient();
    console.log("Supabase client created.");

    console.log(`Fetching content from URL: ${content}`);
    const response = await fetch(content);
    if (!response.ok) {
        console.error('Failed to fetch content from URL:', content, 'Response status:', response.status);
        throw new Error(`Error fetching the content from URL: ${content}`);
    }
    const imageBlob = await response.blob();
    console.log("Content fetched and converted to blob.");

    console.log(`Uploading image blob to Supabase for predictionId: ${predictionId}`);
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
    console.log("Image uploaded to Supabase successfully.");

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/production/${predictionId}`;
    console.log(`Image URL: ${url}`);

    try {
        console.log(`Updating Supabase with new URL for predictionId: ${predictionId}`);
        const { data, error } = await supabase
            .from('master_content')
            .update({ url: url })
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
        }
        console.log('New prediction data inserted into database successfully.');
    }

    console.log('Content uploaded and database updated successfully:', url);
    return url; 
}
