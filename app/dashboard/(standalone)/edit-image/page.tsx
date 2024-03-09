'use client'
import React from 'react';
import ImageEditor from '@/components/dashboard/ImageEditor/ImageEditor';
import DisplayResults from '@/components/dashboard/DisplayResults';
import { Container, Spacer } from '@chakra-ui/react';
import { useEffect } from 'react'; // Make sure 'react' is lowercase
import { currentPageState } from '@/state/user/user_state-atoms';
import { useRecoilState } from 'recoil';

const EditImages = () => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

    useEffect(() => {
        setCurrentPage("editImage");
    }, []); // Empty dependency array to run only on mount

    return (
   <Container>
                <DisplayResults localPage="editImage" />
   <Spacer />
                <ImageEditor />
                </Container>
    );
}

export default EditImages;
