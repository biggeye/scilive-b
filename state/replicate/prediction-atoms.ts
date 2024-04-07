import { atom } from 'recoil';



// INPUTS
export const imageNarrativeUploadState = atom<File | null>({
  key: 'imageNarrativeUploadState',
  default: null,
});

export const userImagePreviewState = atom<string | null>({
  key: 'userImagePreviewState',
  default: null,
});
export const userImageUploadState = atom<File | null>({
  key: 'userImageUploadState',
  default: null,
});

export const userImageDataUriState = atom<string>({
  key: 'userImageDataUriState',
  default: "",
});



// MONITORING
export const temporaryPredictionIdState = atom<string | null>({
  key: 'temporaryPredictionId',
  default: null,
});

export const globalLoadingState = atom<boolean>({
  key: 'globalLoadingState',
  default: false,
});

export const predictionPendingState = atom<boolean>({
  key: 'predictionPendingState',
  default: false,
});

export const cancelRunningPredictionState = atom<string | null>({
  key: 'cancelRuningPredictionState',
  default: null,
});

export const modelBootResultState = atom<string | null>({
  key: 'modelBootResultState',
  default: "Model not started",
});

export const predictionErrorState = atom<string | null>({
  key: 'predictionErrorState',
  default: null,
});

export const predictionProgressState = atom<string | null>({
  key: 'predictionProgressState',
  default: null, // Default progress is 0
});

export const predictionStatusState = atom({
  key: 'predictionStatusState',
  default: '',
});




// OUTPUTS
export const finalPredictionState = atom<string | null>({
  key: 'finalPredictionState',
  default: null,
});

export const finalPredictionPromptState = atom<string>({
  key: 'finalPredictionPromptState',
  default: '',
});

export const finalNarrativePredictionState = atom<string | null>({
  key: 'finalNarrativePredictionState',
  default: '' || null,
});





