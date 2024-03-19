'use client'
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userProfileState } from "@/state/user/user_state-atoms";
//import utilities
import { useUserProfile } from "@/lib/user/useUserProfile";
import { buildRequestBody } from './requestBodyBuilder';
import { fetchPrediction } from './fetchPrediction';
import { convertToDataURI } from "@/utils/convertToDataURI";
import { uploadPrediction } from "../../receive/replicate/uploadPrediction";
import { userImageUploadState, userImageDataUriState, finalPredictionPromptState } from "@/state/replicate/prediction-atoms";
import { selectedModelIdState } from "@/state/replicate/config-atoms";

export const useImageCreateSubmit = () => {

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
  // prediction progress state


  const submitImageCreate = async (userInput: string, userImageDataUri?: string): Promise<string | null> => {

    setFinalPredictionPrompt(userInput);

    if (!userId) {
      console.error("User Login required!");
      return null;
    }
    if (userImageUpload) {
      try {
        const imageUpload: string = await convertToDataURI(userImageUpload);

      } catch (error) {
        console.error("Error converting image to Data URI:", error);
        return null;
      }
    }

    // create payload
    const requestBody = buildRequestBody(userId, modelId, userImageUri, userInput);
    console.log("useImageCreateSubmit, requestBody: ", requestBody);

    // deliver payload (replicate)
    try {
      const predictionId = await fetchPrediction(requestBody);

      return predictionId;
    } catch (err) {
      console.error("An unexpected error occurred");
      return null;
    }
  };

  return submitImageCreate;
};
