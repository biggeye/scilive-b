import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Box,
  Input,
  InputGroup,
  Alert,
  Button,
  InputRightAddon,
  useToast,
  CardHeader,
  VStack,
  CircularProgress,
} from '@chakra-ui/react';
import { Form } from '@saas-ui/react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import {
  predictionErrorState,
  finalPredictionState,
  globalLoadingState,
} from '@/state/replicate/prediction-atoms';
import { useImageCreateSubmit } from '@/lib/dashboard/submit/replicate/useImageCreateSubmit';
import { userProfileState, currentPageState } from '@/state/user/user_state-atoms';
import ToolOptions from '../ToolOptions';
import { predictionProgressState } from '@/state/replicate/prediction-atoms';

const ImageCreator = () => {

  const toast = useToast();
  const userProfile = useRecoilValue(userProfileState);
  const auth = useAuth();
  const { profileLoading, profileError } = useUserProfile();
  const modelId = useRecoilValue(selectedModelIdState);
  const predictionError = useRecoilValue(predictionErrorState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
  const predictionProgress = useRecoilValue(predictionProgressState);
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
      console.log(prediction_id);
      toast({
        title: 'Processing',
        description: `Your image is now processing (ID: ${prediction_id}).`,
        status: 'info',
        duration: 0,
        isClosable: false,
      });
    }
  };

  return (
    <Box
      marginLeft="25px"
      mt={5}
      className="card-standard"
      > 
      <h1 className="title">
        imgCreator
      </h1>
      <form onSubmit={handleSubmit}>
        <VStack>
          {globalLoading ? ( 
            <CircularProgress isIndeterminate />
          ) : (
            <>
              <ToolOptions localPage="createImage" />
              <Input
                boxShadow="lg"
                value={userInput}
                onChange={handleInputChange} />
              <Button size="lg" boxShadow="sm" type="submit">
                Create Image
              </Button>
            </>
          )}
        </VStack>
      </form>
      
    </Box>
  );
};

export default ImageCreator;
