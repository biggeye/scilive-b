import { createClient } from "@/utils/supabase/service";
import { UploadWebsiteSummaryProps } from '@/types';

export const uploadWebsiteSummary = async (
  userId: string,
  predictionId: string,
  content?: string,
  modelId?: string,
  prompt?: string
): Promise<UploadWebsiteSummaryProps | null> => {
    const supabase = createClient();

    if (content) {
        console.log("content: ", content)
        const { data, error } = await supabase
            .from('master_content')
            .update({
                model_id: modelId,
                prompt: prompt,
                content: content
            })
            .eq('prediction_id', predictionId);

        if (error) {
            console.error('Error uploading website summary:', error);
            return null;
        }

        return data ? data[0] : null;
    } else {
        const { data, error } = await supabase
            .from('master_content')
            .insert([{
                created_by: userId,
                prediction_id: predictionId
            }]);

        if (error) {
            console.error('Error inserting website summary:', error);
            return null;
        }

        return data ? data[0] : null;
    }
};
