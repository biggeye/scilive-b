'use client'
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// Cached data for models fetched by type
let cachedModels: Record<string, any> = {};

export async function fetchModels() {
    if (!cachedModels.all) {
        const { data, error } = await supabase.from('models_master').select('*');
        console.log("fetchModels: ", data)
        if (error) throw error;
        cachedModels.all = data;
    }
    return cachedModels.all;
}

export async function fetchTxt2ImgModels() {
    if (!cachedModels.txt2img) {
        try {
            const { data, error } = await supabase.from('models_master').select('*').eq('model_type', 'txt2img');
            if (error) throw error;
            cachedModels.txt2img = data;
        } catch (error) {
            console.error("Error fetching models: ", error);
            throw new Error('Internal Server Error');
        }
    }
    return cachedModels.txt2img;
}

export async function fetchImg2ImgModels() {
    if (!cachedModels.img2img) {
        try {
            const { data, error } = await supabase.from('models_master').select('*').eq('model_type', 'img2img');
            if (error) throw error;
            cachedModels.img2img = data;
        } catch (error) {
            console.error("Error fetching models: ", error);
            throw new Error('Internal Server Error');
        }
    }
    return cachedModels.img2img;
}

// The remaining functions can't be effectively memoized as they depend on the selectedModelId
// However, you can optimize them further by memoizing based on selectedModelId if it's appropriate for your use case.
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

export async function fetchTrainedModels() {
    try {
        const { data, error } = await supabase
        .from('trained_models')
        .select('model_name, id, model_type')
        if (error) throw error;
        return data;
    } catch (error) {
        console.error ("Error fetching trained models: ", error);
        throw new Error('Trained Model server error.')
    }
    }
