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
import { useRecoilValue } from "recoil";
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
  exampleImageState,
  selectedModelNameState,
} from "@/state/replicate/config-atoms";
import Link from "next/link";

const DisplayResults = () => {
  const cancelPrediction = useRecoilValue(cancelRunningPredictionState);
  const globalLoading = useRecoilValue(globalLoadingState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const predictionProgress = useRecoilValue(predictionProgressState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const finalPredictionPrompt = useRecoilValue(finalPredictionPromptState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const exampleImage = useRecoilValue(exampleImageState);
  const model = useRecoilValueLoadable(selectedModelConfigSelector);

  const displayedImage = finalPrediction || userImagePreview;

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
          <VStack>
            <Card>
          <CardHeader>

            {globalLoading && cancelPrediction ? (
              <Link href={cancelPrediction}>Cancel Image Creation</Link>
            ) : (
              <div className="title">{model.friendlyName}</div>
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
        </VStack>
  );
};

export default DisplayResults;
