'use client'
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function fetchModels() {
        const { data, error } = await supabase.from('models_master').select('*');
        if (error) throw error;
        return data;
    }


export async function fetchTxt2ImgModels() {
    try {
        const session = await supabase.auth.getSession();
        const { data, error } = await supabase.from('models_master').select('*').eq('model_type', 'txt2img');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching models: ", error);
        throw new Error('Internal Server Error');
    }
}

export async function fetchImg2ImgModels() {
    try {
        const session = await supabase.auth.getSession();
        const { data, error } = await supabase.from('models_master').select('*').eq('model_type', 'img2img');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching models: ", error);
        throw new Error('Internal Server Error');
    }
}
