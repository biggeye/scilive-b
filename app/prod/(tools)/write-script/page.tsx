'use client'
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import ScriptWriter from '@/components/prod/ScriptWriter';
import { CircularProgress, Grid, GridItem, Skeleton, useToast } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState } from 'recoil';
import { voiceoverScriptState } from '@/state/leap/scriptWriter-atoms';
import { globalLoadingState } from '@/state/replicate/prediction-atoms';

const ScriptWriterPage = () => {
    const [voiceoverScript, setVoiceoverScript] = useRecoilState(voiceoverScriptState);
    const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
    const toast = useToast();
    const supabase = createClient();
    useEffect(() => {
        const handleEvent = (payload: any) => {
            console.log("webhook payload: ", payload);
            const newRow = payload.new;
            
            // Display a toast notification for all successful updates
            toast({
                title: `scr!ptWrit3r update!`,
                status: 'info',
                duration: 5000,
                isClosable: true,
            });
        
            // Check for the script and set it if available
            if (newRow.script) {
                const scriptOutput = newRow.script;
                console.log("Script output available: ", scriptOutput);
                setGlobalLoading(false);
                setVoiceoverScript(scriptOutput);
            } else if (newRow.url) { // Fallback to handle cases where an URL is provided
                const imageUrl = newRow.url;
                console.log("Image URL available: ", imageUrl);
                // Handle image URL if needed, for example:
                // setImageUrl(imageUrl);
                setGlobalLoading(false);
            } else {
                // Handle cases where neither script nor URL is provided
                console.log("No script or URL available in the payload.");
                // Optionally, set loading to false or provide user feedback
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
                (payload) => {
                    console.log("Received payload from items_test: ", payload);
                    handleEvent(payload);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'master_test',
                },
                (payload) => {
                    console.log("Received payload from master_test: ", payload);
                    handleEvent(payload);
                }
            )
            .subscribe()

        return () => {
            console.log("Cleaning up...");
            supabase.removeChannel(insertSubscription);
        };
    }, []);


    return (
        <Suspense fallback={
            <Skeleton height="400px"
                width="400px"
                className="element-pulse" />}>
            <ScriptWriter />
        </Suspense>
    )
}

export default ScriptWriterPage;
