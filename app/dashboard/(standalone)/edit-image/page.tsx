'use client'
import React, { Suspense } from 'react';
import ImageEditor from '@/components/dashboard/ImageEditor/ImageEditor';
import DisplayResults from '@/components/dashboard/DisplayResults';
import { Box, VStack, Skeleton, CircularProgress, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react'; // Make sure 'react' is lowercase
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { globalLoadingState, predictionProgressState } from '@/state/replicate/prediction-atoms';

const ImageEditorPage = () => {

    const predictionProgress = useRecoilValue(predictionProgressState);
    const globalLoading = useRecoilValue(globalLoadingState)

    return (
        <Suspense fallback={
            <Skeleton height="400px"
                width="400px"
                className="element-pulse" />}>
            {globalLoading ? (
                <CircularProgress value={predictionProgress} />
            ) : (
                <VStack
                    display="flex"
                    justifyContent="space-between">

                    <DisplayResults />
                    <Box position="absolute" bottom={{ base: "40px", md: "0px" }}>
                        <ImageEditor />
                    </Box>
                </VStack>
            )}
        </Suspense>
    );
}

export default ImageEditorPage;
