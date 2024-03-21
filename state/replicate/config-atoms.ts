import { atom } from "recoil";
import { selector } from "recoil";
import { fetchModels } from "@/lib/modelServer";
import { ModelList, SelectedModel } from '@/types';
// Atom definitions
export const selectedModelIdState = atom({
  key: "selectedModelIdState",
  default: "",
});

// Selector to fetch models
export const modelListSelector = selector<ModelList>({
  key: 'modelListSelector',
  get: async () => {
    try {
      const models = await fetchModels();
      console.log("modelListSelector: ", models);
      return models;
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  },
});

// Selector to handle selected model configuration
export const selectedModelConfigSelector = selector<SelectedModel>({
  key: 'selectedModelConfigSelector',
  get: async ({ get }) => {
    const selectedModelId = get(selectedModelIdState);
    console.log("selectedModelConfigSelector (setting selected model):", selectedModelId);
    try {
      // Fetch model data
      const modelData = await fetchModels();
      console.log("selectedModelConfigSelector (fetching data): ", modelData);
      const selectedModel = modelData.find(model => model.id === selectedModelId);

      if (selectedModel) {
        return {
          selectedModelId,
          selectedModelFriendlyName: selectedModel.friendlyName,
          selectedModelName: selectedModel.name,
          exampleImage: selectedModel.exampleImage,
          selectedModelShortDesc: selectedModel.shortDesc,
          modelData,
        };
      } else {
        console.error('Selected model not found');
        return {
          selectedModelId,
          selectedModelFriendlyName: "",
          selectedModelName: "",
          exampleImage: "",
          selectedModelShortDesc: "",
          modelData,
        };
      }
    } catch (error) {
      console.error('Error fetching model data:', error);
      return {
        selectedModelId,
        selectedModelFriendlyName: "",
        selectedModelName: "",
        exampleImage: "",
        selectedModelShortDesc: "",
        modelData: null,
      };
    }
  },
});
