"use client";
import React from 'react';
import { Suspense } from "react";
import {
  Box,
  Flex,
  Center,
  VStack,
  CircularProgress,
  Text,
  Progress,
  Card,
  CardBody,
  CardFooter,
  Skeleton,
  CardHeader,
  Button,
  Image
} from "@chakra-ui/react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  cancelRunningPredictionState,
  modelBootResultState,
  predictionStatusState,
  predictionProgressState,
  finalPredictionState,
  finalPredictionPromptState,
  userImagePreviewState,
  globalLoadingState,
} from "@/state/replicate/prediction-atoms";
import {
  selectedModelConfigSelector,
} from "@/state/replicate/config-atoms";
import Link from "next/link";

interface Model {
  selectedModelId: string;
  selectedModelFriendlyName: string;
}

const DisplayResults = () => {
  const cancelPrediction = useRecoilValue(cancelRunningPredictionState);
  const globalLoading = useRecoilValue(globalLoadingState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const finalPredictionPrompt = useRecoilValue(finalPredictionPromptState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const { model } = useRecoilValueLoadable(selectedModelConfigSelector);

  const displayedImage = finalPrediction || userImagePreview;

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <VStack>
      {userImagePreview  || finalPrediction &&
      <Card bgGradient="linear(to-br, primary.300, gray.200, transparent)" height="80vw" width="80vw" position="absolute" top="10%">
        <CardHeader>
             
                <Text>   {model.fruendly_name}</Text>
          {globalLoading && cancelPrediction ? (
            <Link href={cancelPrediction}>Cancel Image Creation</Link>
          ) : (
            <div>model name</div>
          )}

        </CardHeader>
        <CardBody>
          <VStack
            display="flex"
            direction="column"
            justifyContent="space-evenly">
            {globalLoading ? (

              <Skeleton
                height="400px"
                width="400px"
                className="Logo"
              ><CircularProgress
                  isIndeterminate
                  className="element-pulse-fast"
                />
                <Text as="h3" className="subtitle">
                  Model Status: {modelBootResult}
                </Text>
                <Text as="h3" className="subtitle">
                  Prediction Status: {predictionStatus}
                </Text>
              </Skeleton>
            ) : (
              <Box>
                {finalPrediction &&
                  <Image src={finalPrediction} />}
              </Box>
            )}
          </VStack>
        </CardBody>
        <CardFooter>
          <Text as="h3" className="subtitle">
            {finalPredictionPrompt}
          </Text>
        </CardFooter>
      </Card>
}
    </VStack>
  );
};

export default DisplayResults;
