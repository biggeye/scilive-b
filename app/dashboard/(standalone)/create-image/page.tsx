
'use client'
import React from 'react';
import ImageCreator from '@/components/dashboard/ImageCreator';
import DisplayResults from '@/components/dashboard/DisplayResults';
import { Box, VStack, Spacer, CircularProgress, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { globalLoadingState } from '@/state/replicate/prediction-atoms';

const ImageCreatorPage = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
    const globalLoading = useRecoilValue(globalLoadingState);
    useEffect(() => {
        setCurrentPage("createImage");
    }, []);
    return (
        <Suspense fallback={
            <Skeleton height="400px"
                width="400px"
                className="element-pulse" />}>
                    {globalLoading ? (
                        <CircularProgress isIndeterminate />
                    ) : (
                        <VStack
                        display="flex"
                        justifyContent="space-between">
                      
                                <DisplayResults localPage="createImage" />
               <Box position="absolute" bottom={{base: "40px", md: "0px"}}>
                                <ImageCreator />
                                </Box>
                                </VStack>
                    )}
        </Suspense>
    )
}

export default ImageCreatorPage;