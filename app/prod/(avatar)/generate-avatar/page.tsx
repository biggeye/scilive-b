'use client'
import React from 'react';
import { createClient } from '@/utils/supabase/client';
import AvatarGenerator from '@/components/prod/AvatarGenerator';
import { CircularProgress, Grid, GridItem, Skeleton, useToast } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState } from 'recoil';
import { voiceoverScriptState } from '@/state/leap/scriptWriter-atoms';
import { globalLoadingState } from '@/state/replicate/prediction-atoms';

const AvatarGeneratorPage = () => {
     const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);



    return (
        <Suspense fallback={
            <Skeleton height="400px"
                width="400px"
                className="element-pulse" />}>
            <AvatarGenerator />
        </Suspense>
    )
}

export default AvatarGeneratorPage;