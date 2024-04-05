import { atom } from "recoil";
import { selector } from "recoil";
import { fetchModelInputs, fetchModel, fetchModelList } from "@/lib/modelServer";
import { ModelList, SelectedModel, ModelInputs } from '@/types';

export const selectedModelIdState = atom<string>({
  key: "selectedModelIdState",
  default: "",
});

export const modelListState = selector ({
  key: "modelListState",
  get: async () => {
    try {
      const models = await fetchModelList();
      return models;
    } catch (error) {
      console.error("Error fetching models:", error);
      return []; // Return an empty array or handle the error accordingly
    }
  },
})

export const selectedModelConfigSelector = selector({
  key: 'selectedModelConfigSelector',
  get: async ({ get }) => {
    const selectedModelId = get(selectedModelIdState);
    console.log("selectedModelConfigSelector (setting selected model):", selectedModelId);

      const modelData = await fetchModel(selectedModelId);
      console.log("selectedModelConfigSelector (fetching data): ", modelData);
      const selectedModel = modelData.find(model => model.id === selectedModelId);
      const inputs = await fetchModelInputs(selectedModel);
      return {
        inputs
      };
    }
  },
);
