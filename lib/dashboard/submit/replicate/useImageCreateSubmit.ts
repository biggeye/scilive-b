// useImageCreateSubmit.ts
import { useState } from "react";
import { generateUUID } from "@/utils/helpers";
import { useRecoilState, useRecoilValue } from "recoil";
import { userProfileState } from "@/state/user/user_state-atoms";
//import utilities
import { useUserProfile } from "@/lib/user/useUserProfile";
import { buildEditorRequestBody, buildRequestBody } from './requestBodyBuilder';
import { fetchPrediction } from './fetchPrediction';
import { convertToDataURI } from "@/utils/convertToDataURI";

import { 
    userImageUploadState, 
    userImageDataUriState, 
    finalPredictionPromptState, 
    temporaryPredictionIdState } 
  from "@/state/replicate/prediction-atoms";
import { selectedModelIdState } from "@/state/replicate/config-atoms";

export const useImageCreateSubmit = () => {

  const [temporaryPredictionId, setTemporaryPredictionId] = useRecoilState(temporaryPredictionIdState);

  // user account state
  const userProfile = useRecoilValue(userProfileState);
  const { profileLoading, profileError } = useUserProfile();
  const userId = userProfile?.id;

  // model information state
  const modelId = useRecoilValue<string>(selectedModelIdState);

  // user input state
  const userImageUpload = useRecoilValue<File | null>(userImageUploadState);
  const userImageUri = useRecoilValue<string | null>(userImageDataUriState);
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState<string>(finalPredictionPromptState);

  const submitImageCreate = async (userInput: string, userImageUri?: string) => {
    setFinalPredictionPrompt(userInput);

    if (!userId) {
      console.error("User Login required!");
      return null;
    }

      const temporaryPredictionId = generateUUID();
    setTemporaryPredictionId(temporaryPredictionId);
    if (userImageUri) {
    const requestBody = await buildEditorRequestBody(userId, modelId, userImageUri, userInput, temporaryPredictionId);
    console.log("useImageCreateSubmit, requestBody: ", requestBody);
    } else { const requestBody = await buildRequestBody(userId, modelId, userInput, temporaryPredictionId);
    try {
      const fetchedPrediction = await fetchPrediction(requestBody);
        console.log("fetchedPrediction: ", fetchedPrediction)
      return temporaryPredictionId; // Return the unique temporary prediction identifier
    } catch (err) {
      console.error("An unexpected error occurred");
      return null;
    }
  }};

  return submitImageCreate;
};
