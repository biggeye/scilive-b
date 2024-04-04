'use client';
import React, { useState, ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { userProfileState } from '@/state/user/user_state-atoms';
// import utility
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { useImageCreateSubmit } from '@/lib/dashboard/submit/replicate/useImageCreateSubmit';
import { convertToDataURI } from '@/utils/convertToDataURI';
// import UI
import {
  Spacer,
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

// import TYPES
import ToolOptions from '../ToolOptions';

const ImageEditor = () => {

  const userProfile = useRecoilValue(userProfileState);
  const userId = userProfile?.id;

  const imageEditSubmit = useImageCreateSubmit();

  const finalPrediction = useRecoilValue(finalPredictionState);
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);

  const [userInput, setUserInput] = useState<string>('');
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);
  const setUserImagePreview = useSetRecoilState(userImagePreviewState);
  const setUserImageUpload = useSetRecoilState(userImageUploadState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      console.log("File:", file); // Log the file object
      if (file) {
        setUserImageUpload(file);
        const imagePreview = await URL.createObjectURL(file);
        if (imagePreview) {
          setUserImagePreview(imagePreview);
          console.log("Image Preview URL:", imagePreview); // Log the image preview URL
        }
        const URI = await convertToDataURI(file);
        if (URI) {
          console.log("Data URI:", userImageDataUri); // Log the data URI
          setUserImageDataUri(URI);
        }
      }
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
      <form onSubmit={handleUserImageEditSubmit}>

          {globalLoading ? (
            <VStack>
              <CircularProgress isIndeterminate />
              <button onClick={handleCancelPrediction}>Cancel</button>
            </VStack>
          ) : (
            <Box display="flex" flexDirection={{base: "column", md: "row"}}>
              <ToolOptions localPage="editImage" />
              <Spacer />
              <Grid templateAreas={`"upload prompt"`}
                gridTemplateColumns="2">
                <GridItem area="upload">
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
                </GridItem>
                <GridItem area="prompt">
                  <HStack>
                  <Input
                    value={userInput}
                    onChange={handleInputChange}
                  />
                  <Button boxShadow="sm" size="lg" type="submit">
                    Perform Edit
                  </Button>
                  </HStack>
                </GridItem>
              </Grid>
            </Box>
            )}

      </form>
      {predictionError && <Alert fontSize={{ base: "sm", md: "md" }}>{predictionError}</Alert>}
    </Box >
  )
}

export default ImageEditor;