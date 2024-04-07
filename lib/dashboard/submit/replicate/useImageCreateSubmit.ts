// useImageCreateSubmit.ts
import { useState } from "react";
import { generateUUID } from "@/utils/helpers";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userProfileState } from "@/state/user/user_state-atoms";
import { buildEditorRequestBody, buildRequestBody } from './requestBodyBuilder';
import { fetchPrediction } from './fetchPrediction';
import { convertToDataURI } from "@/utils/convertToDataURI";

import {
    userImageUploadState, 
    userImageDataUriState, 
    finalPredictionPromptState, 
    temporaryPredictionIdState,
    globalLoadingState, // Assume you add this if needed for direct manipulation or observation
    predictionErrorState // To log and handle prediction errors
} from "@/state/replicate/prediction-atoms";
import { selectedModelIdState } from "@/state/replicate/config-atoms";

export const useImageCreateSubmit = () => {
  const userImageUri = useRecoilValue<string | null>(userImageDataUriState);
  const [temporaryPredictionId, setTemporaryPredictionId] = useRecoilState(temporaryPredictionIdState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState<string>(finalPredictionPromptState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState); // Assuming you have global loading state
  const setUserError = useSetRecoilState(predictionErrorState); // To set error messages

  const userProfile = useRecoilValue(userProfileState);

  const modelId = useRecoilValue<string>(selectedModelIdState);

  const submitImageCreate = async (userInput: string) => {
    console.log("Starting image creation process...");

    setGlobalLoading(true);
    setFinalPredictionPrompt(userInput);

    if (!userProfile?.id) {
      console.error("User Login required!");
      setUserError("User login required to perform this action.");
      setGlobalLoading(false);
      return null;
    }

    const temporaryId = generateUUID();
    setTemporaryPredictionId(temporaryId);

    try {
      let requestBody;
      if (userImageUri) {
        requestBody = await buildEditorRequestBody(userProfile.id, modelId, userImageUri, userInput, temporaryId);
      } else {
        requestBody = await buildRequestBody(userProfile.id, modelId, userInput, temporaryId);
      }
      console.log("Request body for prediction:", requestBody);

      const fetchedPrediction = await fetchPrediction(requestBody);
      console.log("Prediction response:", fetchedPrediction);
      
    } catch (error) {
      console.error("An unexpected error occurred during image creation:", error);
      setUserError("An unexpected error occurred. Please try again.");
    } finally {
      setGlobalLoading(false);
    }
  };

  return submitImageCreate;
};
