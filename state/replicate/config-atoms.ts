import { atom } from "recoil";
import { selector } from "recoil";
import { fetchModels } from "@/lib/modelServer";// REPLICATE MODEL SELECTION

export const selectedModelIdState = atom({
  key: "selectedModelIdState",
  default: "",
});
export const selectedModelFriendlyNameState = atom({
  key: "selectedModelFriendlyNameState",
  default: "",
});
export const selectedModelNameState = atom({
  key: "selectedModelNameState",
  default: "",
});
export const exampleImageState = atom({
  key: 'exampleImageState',
  default: "",
});
export const selectedModelShortDescState = atom({
  key: "selectedModelShortDescState",
  default: "",
});


const queryModelData = async (selectedModelId: string) => {
  const modelData = await fetchModels();
  return modelData;
}
export const selectedModelConfigSelector = selector({
  key: 'selectedModelConfigSelector',
  get: async ({ get }) => {
    const selectedModelId = get(selectedModelIdState);

    try {
      const modelData = await queryModelData(selectedModelId);

      return {
        selectedModelId,
        selectedModelFriendlyName: "", // Initialize with default values or handle them accordingly
        selectedModelName: "", // Initialize with default values or handle them accordingly
        exampleImage: "", // Initialize with default values or handle them accordingly
        selectedModelShortDesc: "", // Initialize with default values or handle them accordingly
        modelData // Include model data fetched from the table
      };
    } catch (error) {
      console.error('Error fetching model data:', error);
      return {
        selectedModelId,
        selectedModelFriendlyName: "", // Initialize with default values or handle them accordingly
        selectedModelName: "", // Initialize with default values or handle them accordingly
        exampleImage: "", // Initialize with default values or handle them accordingly
        selectedModelShortDesc: "", // Initialize with default values or handle them accordingly
        modelData: null // Set modelData to null in case of error
      };
    }
  },
});
