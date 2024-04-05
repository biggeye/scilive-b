
'use client'
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import ImageCreator from '@/components/prod/ImageCreator';
import DisplayResults from '@/components/prod/DisplayResults';
import { useToast, Box, VStack, Spacer, CircularProgress, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { finalPredictionState, predictionProgressState, globalLoadingState } from '@/state/replicate/prediction-atoms';

const ImageCreatorPage = () => {

  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [finalPrediction, setFinalPrediction] = useRecoilState(finalPredictionState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
  const toast = useToast();
  const supabase = createClient();
  useEffect(() => {
    const handleEvent = (payload: any) => {
      console.log("webhook payload: ", payload);
      const newRow = payload.new;
      const predictionId = newRow.id;
      toast({
        title: `${predictionId} complete!`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      // Corrected access to payload data
      if (newRow.url) {
        const output = newRow.url; // Correct path to the data
        setGlobalLoading(false);
        setFinalPrediction(output);
      }
    };

    const insertSubscription = supabase
    .channel('db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'items_test',
      },
      (payload) => handleEvent(payload)
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'master_test',
      },
      (payload) => handleEvent(payload)
    )
    .subscribe()

    return () => {
      supabase.removeChannel(insertSubscription);
    };
  }, []);

  return (
    <Suspense fallback={
      <Skeleton height="400px"
        width="400px"
        className="element-pulse" />}>
      <VStack
        display="flex"
        justifyContent="space-between">
        
        <DisplayResults />
        <Box position="absolute" bottom={{ base: "40px", md: "0px" }}>
          <ImageCreator />
          {globalLoading && <CircularProgress isIndeterminate />}
        </Box>
      </VStack>

    </Suspense>
  )
}

export default ImageCreatorPage;