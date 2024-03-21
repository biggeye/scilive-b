import { atom } from "recoil";
import { selector } from "recoil";
import { fetchModelInputs, fetchModels, fetchModel } from "@/lib/modelServer";
import { ModelList, SelectedModel, ModelInputs } from '@/types';

// Atom definitions
export const selectedModelIdState = atom<string>({
  key: "selectedModelIdState",
  default: "",
});



export const selectedModelConfigSelector = selector({
  key: 'selectedModelConfigSelector',
  get: async ({ get }) => {
    const selectedModelId = get(selectedModelIdState);
    console.log("selectedModelConfigSelector (setting selected model):", selectedModelId);
    try {
      // Fetch model data
      const modelData = await fetchModel(selectedModelId);
      console.log("selectedModelConfigSelector (fetching data): ", modelData);
      const selectedModel = modelData.find(model => model.id === selectedModelId);

      if (selectedModel) {
        const inputs: ModelInputs[] = await fetchModelInputs(selectedModelId);
                if (!inputs) {
        return {
          selectedModelId,
          selectedModelFriendlyName: selectedModel.friendly_name,
          selectedModelName: selectedModel.name,
          selectedModelDescription: selectedModel.description,
        }} else {
          console.log("models_inputs: ", {...inputs})
          return {
            selectedModelId,
            selectedModelFriendlyName: selectedModel.friendly_name,
            selectedModelName: selectedModel.name,
            selectedModelDescription: selectedModel.description,
            selectedModelInputs: {...inputs},
        };
      }}}
      catch (error) {
      console.error('Error fetching model data:', error);
      return {
        selectedModelId
      };
    }
  },
});
