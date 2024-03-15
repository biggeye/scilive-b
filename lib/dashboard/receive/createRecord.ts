'use server'
import createClient from '@/utils/supabase/server'

const createContentRecord = async (userId: string, predictionId: string) => {
    const supabase = createClient();
    const user_id = userId;
    const prediction_id = predictionId;

    const payload = {
        "created_by": user_id, 
        "predictionId": prediction_id
    }

    try {
        const { data, error } = await supabase.from('master_content').insert(payload);
        if (error) {
            console.error('Error inserting record:', error);
            throw error;
        }
        return data;
    } catch(err) {
        console.error('Unexpected error:', err);
        return null;
    }
}

export default createContentRecord;
