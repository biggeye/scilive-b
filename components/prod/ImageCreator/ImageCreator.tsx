'use client'
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
  Textarea
} from '@chakra-ui/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import {
  globalLoadingState,
} from '@/state/replicate/prediction-atoms';
import { useImageCreateSubmit } from '@/lib/dashboard/submit/replicate/useImageCreateSubmit';
import ToolOptions from '../ToolOptions';

const ImageCreator = async () => {

  const modelId = useRecoilValue(selectedModelIdState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
  const [userInput, setUserInput] = useState<string>('');
  const imageCreateSubmit = useImageCreateSubmit();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalLoading(true);

    if (!modelId) {
      alert('Please select a model');
      console.error('No modelId available')
      setGlobalLoading(false);
      return;
    }
    await imageCreateSubmit(userInput);
  };

  const handleCancelPrediction = () => {
    setGlobalLoading(false);
    setUserInput('');
  }

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
          {globalLoading && <Button onClick={handleCancelPrediction}>Cancel</Button>}
              <ToolOptions localPage="createImage" />
              <Textarea
                // Render Textarea when inputType is 'textarea'
                boxShadow="lg"
                value={userInput}
                onChange={(e) => {
                  e.preventDefault();
                  setUserInput(e.target.value);
                }}
              />
              <Button size="lg" boxShadow="sm" type="submit">
                Create Image
              </Button>
         </VStack>
      </form>

    </Box>
  );
};

export default ImageCreator;
