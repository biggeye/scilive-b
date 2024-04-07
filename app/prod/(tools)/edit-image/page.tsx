'use client'
import React, { Suspense } from 'react';
import { createClient } from '@/utils/supabase/client';
import ImageEditor from '@/components/prod/ImageEditor/ImageEditor';
import DisplayResults from '@/components/prod/DisplayResults';
import { Text, Box, VStack, Skeleton, CircularProgress, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react'; // Make sure 'react' is lowercase
import { useRecoilState, useSetRecoilState } from 'recoil';
import { finalPredictionState, globalLoadingState, predictionProgressState } from '@/state/replicate/prediction-atoms';

const ImageEditorPage = () => {

    const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
    const setFinalPrediction = useSetRecoilState(finalPredictionState);
    const setPredictionStatus = useSetRecoilState(predictionProgressState);

    useEffect(() => {
        const handleEvent = (payload: any) => {
            console.log("webhook payload: ", payload);
            const newRow = payload.new;
            setGlobalLoading(false);
            setPredictionStatus("Succeeded");
            // cancelTempId(newRow.temp_id);
            if (newRow && newRow.url) {
                setFinalPrediction(newRow.url);
            } else {
                console.error("Error: 'url' value not found in payload");
            }
        };

        const supabase = createClient();

        const itemInsertSubscriptions = supabase
            .channel('items_test_inserts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'items_test' }, handleEvent)
            .subscribe();

        return () => {
            supabase.removeChannel(itemInsertSubscriptions);
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
                <Box position="fixed" bottom={{ base: "40px", md: "0px" }}>
                    <ImageEditor />
                </Box>
            </VStack>

        </Suspense>
    );
}

export default ImageEditorPage;
