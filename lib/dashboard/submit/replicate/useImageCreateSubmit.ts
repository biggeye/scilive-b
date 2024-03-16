'use client'
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

//import utilities
import { useUserProfile } from "@/lib/user/useUserProfile";
import { buildRequestBody } from './requestBodyBuilder';
import { fetchPrediction } from './fetchPrediction';
import { convertToDataURI } from "@/utils/convertToDataURI";
import { uploadPrediction } from "../../receive/replicate/uploadPrediction";

import {
  predictionErrorState,
  finalPredictionState,
  finalPredictionPromptState,
  userImageDataUriState,
  modelBootResultState,
  userImageUploadState,
} from "@/state/replicate/prediction-atoms";
import { selectedModelIdState } from "@/state/replicate/config-atoms";
import { userProfileState } from "@/state/user/user_state-atoms";

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
  const [finalPredictionPrompt, setFinalPredictionPrompt] = useRecoilState(finalPredictionPromptState);
 
  // prediction progress state
  const [modelBootResult, setModelBootResult] = useRecoilState<string | null>(modelBootResultState);
  const [predictionError, setPredictionError] = useRecoilState<string | null>(predictionErrorState);
  const [finalPrediction, setFinalPrediction] = useRecoilState<string | null>(finalPredictionState);
 
  const submitImageCreate = async (userInput: string, userImageDataUri?: string): Promise<string | null> => {
    setPredictionError(null);
    setModelBootResult(null);
    setFinalPrediction(null);
    setFinalPredictionPrompt(userInput);
  
    if (!userId) {
      console.error("User Login required!");
      setPredictionError("User Login required!");
      return null;
    }
    if (userImageUpload) {
      try {
        const imageUpload: string = await convertToDataURI(userImageUpload);
        
      } catch (error) {
        console.error("Error converting image to Data URI:", error);
        setPredictionError("Failed to process image");
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
      setPredictionError("An unexpected error occurred");
      return null;
    }
  };

  return submitImageCreate;
};