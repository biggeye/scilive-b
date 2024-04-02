import { atom, selector } from "recoil";
import { fetchTrainedModels } from "@/lib/modelServer";


export interface TrainedModelSelect {
    id: string | "",
    typeOfModel: string | "",
    name: string | "",
}

export const trainedModelsState = atom<TrainedModel[]>({
    key: 'trainedModelsState',
    default: [],
});



export const trainedModelsSelector = selector({
  key: 'trainedModelsSelector',
  get: async () => {
    try {
      // Fetch trained models data
      const trainedModelsData = await fetchTrainedModels();
      console.log("trainedModelsSelector (fetching data): ", trainedModelsData);
      // Assuming trainedModelsData is the array of trained models we need
      if (trainedModelsData) {
        return trainedModelsData;
      }
    } catch (error) {
      console.error('Error fetching trained models data:', error);
      // Return default state in case of error
      return [];
    }
  },
});
