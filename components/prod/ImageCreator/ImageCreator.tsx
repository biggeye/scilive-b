'use client'
import React, { useState, useEffect } from 'react';
import {
  Progress,
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

const ImageCreator = () => {
  const [prePrediction, setPrePrediction] = useState(true);
  const modelId = useRecoilValue(selectedModelIdState);
  const [globalLoading, setGlobalLoading] = useRecoilState(globalLoadingState);
  const [userInput, setUserInput] = useState<string>('');
  const imageCreateSubmit = useImageCreateSubmit();


useEffect(() => {
  setUserInput("")
}, [globalLoading])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modelId) {
      alert('Please select a model');
      console.error('No modelId available')
      setGlobalLoading(false);
      return;
    }
    setGlobalLoading(true);
    setPrePrediction(false);

    
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
      <form onSubmit={handleSubmit}>
        <VStack>
          {globalLoading ? (
            <Box width="80vw" height="auto">
            <Button onClick={handleCancelPrediction}>Cancel</Button>
            <Progress isIndeterminate className="element-pulse" />
            </Box>
          ) : (
            <VStack>
              <ToolOptions />
              <Textarea
              borderColor="primary.50"
              borderWidth="2px"
              bgGradient="linear(to-br, primary.50, transparent, transparent, transparent, transparent, transparent, primary.50)"
              width="80vw"
                // Render Textarea when inputType is 'textarea'
                boxShadow="lg"
                value={userInput}
                placeholder='describe the image you would like to create'
                onChange={(e) => {
                  e.preventDefault();
                  setUserInput(e.target.value);
                }}
              />
              <Button mb={{base: "35px", md: "0px"}} size={{base: "sm", md: "lg"}} boxShadow="sm" type="submit">
                Create Image
              </Button>
            </VStack>
          )}


        </VStack>
      </form>

    </Box>
  );
};

export default ImageCreator;
