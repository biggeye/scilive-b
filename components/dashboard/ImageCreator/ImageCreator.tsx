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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import {
  predictionProgressState,
  predictionErrorState,
  finalPredictionState,
  globalLoadingState,
} from '@/state/replicate/prediction-atoms';
import { useImageCreateSubmit } from '@/lib/dashboard/submit/replicate/useImageCreateSubmit';
import { userProfileState, currentPageState } from '@/state/user/user_state-atoms';

const ImageCreator = () => {
  const toast = useToast();
  const userProfile = useRecoilValue(userProfileState);
  const auth = useAuth();
  const { profileLoading, profileError } = useUserProfile();
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);
  const setGlobalLoading = useSetRecoilState(globalLoadingState);
  const [userInput, setUserInput] = useState<string>('');
  const imageCreateSubmit = useImageCreateSubmit();
  const setCurrentPage = useSetRecoilState(currentPageState);

  useEffect(() => {
    setCurrentPage('createImage');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalLoading(true);
    if (!modelId || !userProfile?.id) {
      console.error('No model selected or user not found');
      setGlobalLoading(false);
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
  };

  return (
    <Box width="98vw" p="7px" bgColor="primary.50" borderRadius="md">
      <form onSubmit={handleSubmit}>
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
      </form>
    </Box>
  );
};

export default ImageCreator;
