'use client'
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function fetchModels() {
        const { data, error } = await supabase.from('models_master').select('*');
        console.log("fetchModels: ", data)
        if (error) throw error;
        return data;
    }

export async function fetchTxt2ImgModels() {
    try {

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

        const { data, error } = await supabase.from('models_master').select('*').eq('model_type', 'img2img');
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching models: ", error);
        throw new Error('Internal Server Error');
    }
}

export async function fetchModel(selectedModelId: string) {
    const { data, error } = await supabase.from('models_master').select('*').eq('id', `${selectedModelId}`);
    console.log("fetchModels: ", data)
    if (error) throw error;
    return data;
}

export async function fetchModelInputs(selectedModelId: string) {
    try {
        const { data, error } = await supabase
          .from('models_inputs_detail')
          .select('variable, default_value, description, validation_rules, is_required')
          .eq('parent_model', `${selectedModelId}`);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching models: ", error);
        throw new Error('Internal Server Error');
    }
}
