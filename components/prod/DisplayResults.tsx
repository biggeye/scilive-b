import React from 'react';
import { Button, Grid, GridItem, CardFooter, Box, VStack, Text, Card, CardBody, CardHeader, Skeleton, Image, CircularProgress } from "@chakra-ui/react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { cancelRunningPredictionState, modelBootResultState, predictionStatusState, finalPredictionState, finalPredictionPromptState, userImagePreviewState, globalLoadingState } from "@/state/replicate/prediction-atoms";
import { selectedModelConfigSelector } from "@/state/replicate/config-atoms";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const DisplayResults = () => {
  const router = useRouter();
  const cancelPrediction = useRecoilValue(cancelRunningPredictionState);
  const globalLoading = useRecoilValue(globalLoadingState);
  const modelBootResult = useRecoilValue(modelBootResultState);
  const predictionStatus = useRecoilValue(predictionStatusState);
  const finalPrediction = useRecoilValue(finalPredictionState);
  const finalPredictionPrompt = useRecoilValue(finalPredictionPromptState);
  const userImagePreview = useRecoilValue(userImagePreviewState);
  const modelLoadable = useRecoilValueLoadable(selectedModelConfigSelector);

  let model;
  if (modelLoadable.state === "hasValue") {
    model = modelLoadable.contents;
  }

  if (userImagePreview) {
    console.log("userImagePreview (via DisplayResults): ", userImagePreview);
  }

  const handleCancel = () => {
    if (cancelPrediction) {
      router.push(cancelPrediction); // Redirect to cancelPrediction route
    } else {
      console.error("Cancel prediction route is not available.");
    }
  }

  return (
    <VStack>
      <Card bgGradient="linear(to-br, primary.300, gray.200, transparent)" height="80vw" width="80vw" position="absolute" top="10%">
        <CardHeader>

          {globalLoading && <Button onClick={handleCancel}>Cancel Image Creation</Button>}


        </CardHeader>
        <CardBody>
          <Grid gridTemplateAreas={{
            base: `"preview"
                                           "final"`,
            md: `preview final`
          }}
            gridTemplateColumns={{ base: "1", md: "2" }}
          >
            <GridItem area="preview">
              <VStack
                display="flex"
                direction="column"
                justifyContent="space-evenly"
              >
                {globalLoading ? (
                  <Skeleton height="400px" width="400px" className="Logo">
                    <CircularProgress isIndeterminate className="element-pulse-fast" />
                    <Text as="h3" className="subtitle">
                      Model Status: {modelBootResult}
                    </Text>
                    <Text as="h3" className="subtitle">
                      Prediction Status: {predictionStatus}
                    </Text>
                  </Skeleton>
                ) : (
                  <Box>


                    {userImagePreview &&
                      <VStack>
                        <Text>Before:</Text>
                        <Image maxW={{ base: "75vw", md: "35vw" }} src={userImagePreview} />
                      </VStack>
                    }

                  </Box>
                )}
              </VStack>
            </GridItem>
            <GridItem area="final">
              <VStack
                display="flex"
                direction="column"
                justifyContent="space-evenly"
              >
                {finalPrediction ? (
                  <VStack>
                
                    <Image maxW={{ base: "75vw", md: "35vw" }} src={finalPrediction} />
                  </VStack>
                ) : (
                  <VStack>
                    {finalPredictionPrompt &&
                      <Text>
                        Prompt: {finalPredictionPrompt}
                      </Text>
                    }
                    {predictionStatus &&
                      <Text as="h3" className="subtitle">
                        Prediction Status: {predictionStatus}
                      </Text>
                    }
                    <Skeleton maxW="35vw" className="Logo" />
                  </VStack>
                )}
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
        <CardFooter>
          <Text as="h3" className="subtitle">
            {finalPredictionPrompt}
          </Text>
        </CardFooter>
      </Card>
    </VStack >
  );
};

export default DisplayResults;
