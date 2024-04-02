'use client';
import React, { useState, ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { userProfileState } from '@/state/user/user_state-atoms';
// import utility
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { useImageCreateSubmit } from '@/lib/dashboard/submit/replicate/useImageCreateSubmit';
import { handleGalleryEditSelection } from '@/lib/gallery/handleGalleryEditSelection';
import { convertToDataURI } from '@/utils/convertToDataURI';
// import UI
import {
  CircularProgress, VStack, Alert, Input, InputGroup, InputRightAddon, FormControl, HStack, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure,
  Image, Grid, GridItem, Text, Card, CardBody, CardHeader, CardFooter
} from '@chakra-ui/react';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload';

// import STATE
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { finalPredictionState, userImageDataUriState, userImagePreviewState, userImageUploadState, predictionErrorState, globalLoadingState } from '@/state/replicate/prediction-atoms';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import { currentPageState } from '@/state/user/user_state-atoms';
// import TYPES
import ToolOptions from '../ToolOptions';

const ImageEditor = () => {
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
  const auth = useAuth();
  const supabase = createClient();
  const userProfile = useRecoilValue(userProfileState);

  const userId = userProfile?.id;
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  useEffect(() => {
    setCurrentPage("editImage");
  }, [currentPage]);

  const imageEditSubmit = useImageCreateSubmit();
  // read Global State
  const finalPrediction = useRecoilValue(finalPredictionState);
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);

  const [userInput, setUserInput] = useState<string>('');
  const setUserImagePreview = useSetRecoilState(userImagePreviewState);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      console.log("File:", file); // Log the file object
  
      const imagePreview = URL.createObjectURL(file);
      console.log("Image Preview URL:", imagePreview); // Log the image preview URL
  
      setUserImageUpload(file);
  
      setUserImagePreview(imagePreview);
      console.log("Set User Image Preview State:", imagePreview); // Log the image preview state
  
      const URI = await convertToDataURI(file);
      console.log("Data URI:", URI); // Log the data URI
  
      setUserImageDataUri(URI);
      console.log("Set User Image Data URI State:", URI); // Log the data URI state
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);

  const handleUserImageEditSubmit = async () => {
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    setGlobalLoading(true);
    await imageEditSubmit(userInput, userImageDataUri);
    if (finalPrediction) {
      setUserImageUpload(null);
      setUserImagePreview(null);
      setGlobalLoading(false);
    }
  };

  const handleCancelPrediction = () => {
    setGlobalLoading(false);
    setUserInput('');
  
  }
  

  return (
    <Box
      marginLeft="25px"
      mt={5}
      className="card-standard">
      <h1 className="title">
        imgEditor
      </h1>

      <form onSubmit={handleUserImageEditSubmit}>
        <VStack>
        {globalLoading ? ( 
            <VStack>
            <CircularProgress isIndeterminate />
            <button onClick={handleCancelPrediction}>Cancel</button>
            </VStack>
          ) : (
            <>
          <ToolOptions localPage="editImage" />
          <FileUpload
            boxShadow="lg"
            maxFileSize={10000 * 10000}
            maxFiles={1}
            accept="image/*"
            onChange={handleFileChange}
          >
            {({ files, deleteFile }) => (
              <FileUploadDropzone
              >
                {!files?.length ? (
                  <FileUploadTrigger color="teal" as={Button}>Drop Image or Click</FileUploadTrigger>
                ) : (
                  <HStack>
                    <Text fontSize="sm">{files[0].name}</Text>
                    <Button
                      boxShadow="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteFile(files[0])
                      }}
                    >
                      Clear
                    </Button>
                  </HStack>
                )}
              </FileUploadDropzone>
            )}
          </FileUpload>
          <Input
            value={userInput}
            onChange={handleInputChange}
          />
          <Button boxShadow="sm" size="lg" type="submit">
            Edit Image
          </Button>
          </>)}
        </VStack>
      </form>
      {predictionError && <Alert fontSize={{ base: "sm", md: "md" }}>{predictionError}</Alert>}
    </Box >
  )
}

export default ImageEditor;