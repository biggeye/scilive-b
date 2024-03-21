import { atom } from "recoil";
import { selector } from "recoil";
import { fetchModels } from "@/lib/modelServer";

// Atom definitions
export const selectedModelIdState = atom({
  key: "selectedModelIdState",
  default: "",
});

// Selector to fetch models
export const modelListSelector = selector({
  key: 'modelListSelector',
  get: async () => {
    try {
      const models = await fetchModels();
      return models;
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  },
});

// Selector to handle selected model configuration
export const selectedModelConfigSelector = selector({
  key: 'selectedModelConfigSelector',
  get: async ({ get }) => {
    const selectedModelId = get(selectedModelIdState);

    try {
      // Fetch model data
      const modelData = await fetchModels();
      // Find the selected model based on its ID
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
