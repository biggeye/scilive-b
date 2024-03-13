import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  InputGroup,
  Alert,
  Button,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import { userProfileState } from '@/state/user/user_state-atoms';

import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import {
  predictionProgressState,
  predictionErrorState,
  finalPredictionState,
  globalLoadingState,
} from '@/state/replicate/prediction-atoms';
import { useImageCreateSubmit } from '@/lib/replicate/useImageCreateSubmit';
import {
  Form,
  FormLayout,
  DisplayIf,
  SubmitButton,
  Field,
} from '@saas-ui/react';
import { currentPageState } from '@/state/user/user_state-atoms';

const ImageCreator = () => {
  const toast = useToast();
  const userProfile = useRecoilValue(userProfileState);
  const auth = useAuth();
  const { profileLoading, profileError } = useUserProfile();
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
  const [userInput, setUserInput] = useState<string>('');
  const imageCreateSubmit = useImageCreateSubmit();
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  useEffect(() => {
    setCurrentPage('createImage');
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput(e.target.value);

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalLoading(true);
    if (!modelId || !userProfile?.id) {
      console.error('No model selected or user not found');
      return;
    }
    const prediction_id = await imageCreateSubmit(userInput);
    if (prediction_id) {
      toast({
        title: 'Processing',
        description: `Your image is now processing (ID: ${prediction_id}). You will be notified upon completion.`,
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
    }
    setGlobalLoading(false);
  };

  return (
    <Box width="100%" p="7px" bgGradient="Linear(to-tr, transparent, primary.50, transparent, primary.800)">
      <InputGroup>
      <Input
        value={userInput}
        onChange={handleInputChange}
      />
      <InputRightAddon>
      <Button type="submit">
        Create Image
      </Button>
      </InputRightAddon>
      </InputGroup>
    </Box>
  );
};

export default ImageCreator;
