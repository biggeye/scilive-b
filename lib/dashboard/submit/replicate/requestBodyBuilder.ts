// requestBodyBuilder.ts
export const buildEditorRequestBody = (userId: string, modelId: string, userImageUri: string | null, userInput: string, temporaryPredictionId: string) => {
    return {
      user_id: userId,
      version: modelId,
      input_images: userImageUri || null,
      prompt: userInput || null,
      temporaryPredictionId: temporaryPredictionId
    };
  }

  export const buildRequestBody = (userId: string, modelId: string, userInput: string, temporaryPredictionId: string) => {
    return {
      user_id: userId,
      version: modelId,
      prompt: userInput || null,
      temporaryPredictionId: temporaryPredictionId
    };
  }