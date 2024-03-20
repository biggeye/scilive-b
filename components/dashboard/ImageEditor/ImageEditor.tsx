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
  Alert, Input, InputGroup, InputRightAddon, FormControl, HStack, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure,
  Image, Grid, GridItem, Text, Card, CardBody, CardHeader, CardFooter
} from '@chakra-ui/react';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload';
import {
  Form,
  FormLayout,
  ViewIcon,
  ContextMenuList,
  ContextMenuItem,
  ContextMenu,
  ContextMenuTrigger
} from '@saas-ui/react';
// import STATE
import { useRecoilState, useRecoilValue } from 'recoil';
import { finalPredictionState, userImageDataUriState, userImagePreviewState, userImageUploadState, predictionErrorState, globalLoadingState } from '@/state/replicate/prediction-atoms';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import { currentPageState } from '@/state/user/user_state-atoms'
// import TYPES
import { GalleryItem } from '@/types';
import ToolOptions from '../ToolOptions';

const ImageEditor = () => {
  const auth = useAuth();
  const supabase = createClient();
  const userProfile = useRecoilValue(userProfileState);

  const userId = userProfile?.id;

  const { profileLoading, profileError } = useUserProfile();
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  useEffect(() => {
    setCurrentPage("editImage");
  }, [currentPage]);

  const imageEditSubmit = useImageCreateSubmit();
  // read Global State
  const finalPrediction = useRecoilValue(finalPredictionState);
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);
  const globalLoading = useRecoilValue(globalLoadingState);
  // Gallery State and Fetching
  const { isOpen, onOpen, onClose } = useDisclosure();
  // User Input State
  const [userInput, setUserInput] = useState<string>('');
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const imagePreview = URL.createObjectURL(file);
      setUserImageUpload(file);
      setUserImagePreview(imagePreview);
      const URI = await convertToDataURI(file);
      setUserImageDataUri(URI);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value);

  const handleUserImageEditSubmit = async () => {
    if (!modelId || !userId) {
      console.error("No model selected or user not found");
      return;
    }
    await imageEditSubmit(userInput, userImageDataUri);
    if (finalPrediction) {
      setUserImageUpload(null);
      setUserImagePreview(null);
    }
  };

  return (
    <Box 
    marginLeft="25px"
    mt={5} 
    className="card-standard">
      <h1 className="title">
        img3d!to|2
      </h1>
      <ToolOptions localPage="editImage" />
      <form onSubmit={handleUserImageEditSubmit}>
        <FileUpload
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
        <Button type="submit">
          Edit Image
        </Button>
      </form>
      {predictionError && <Alert fontSize={{ base: "sm", md: "md" }}>{predictionError}</Alert>}
    </Box >
  )
}

export default ImageEditor;