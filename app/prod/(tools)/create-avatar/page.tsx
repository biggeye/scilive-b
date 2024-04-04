'use client'
import React from 'react';
import AvatarCreator from '@/components/prod/AvatarCreator';
import { CircularProgress, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState } from 'recoil';

const AvatarCreatorPage = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        setCurrentPage("createImage");
    }, []);
    return (
        <Suspense fallback={
            <Skeleton height="400px"
                width="400px"
                className="element-pulse" />}>
                    <Grid>
                        <GridItem>
                            <AvatarCreator />
                        </GridItem>
                    </Grid>
                          </Suspense>
    )
}

export default AvatarCreatorPage;