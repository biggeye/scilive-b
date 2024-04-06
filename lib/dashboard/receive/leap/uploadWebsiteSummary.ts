import { createClient } from "@/utils/supabase/service";
import { UploadWebsiteSummaryProps } from '@/types';

export const uploadWebsiteSummary = async (
  userId: string,
  predictionId: string,
  script?: string,
  modelId?: string,
  prompt?: string,
  name?: string,
  title?: string
): Promise<UploadWebsiteSummaryProps | null> => {
    const supabase = createClient();

    if (script) {
        console.log("script: ", script)
        const { data, error } = await supabase
            .from('master_content_test')
            .upsert({
                prediction_id: predictionId,
                model_id: modelId,
                prompt: prompt,
                name: name,
                title: title,
                script: `["${script}"]`
                
            })

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
