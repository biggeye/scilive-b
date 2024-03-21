
'use client'
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Grid, GridItem, Card, CardHeader, Heading, HStack, Text, Box, Button, FormControl, FormLabel, Input, Select, useToast, VStack } from '@chakra-ui/react';
import { modelIdState, modelTrainingDataState, numberOfImagesState, typeOfModelState, trainingModelNameState } from '@/state/leap/trainedModel-atoms';
import { userProfileState } from '@/state/user/user_state-atoms';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { createClient } from '@/utils/supabase/client';
import { FileUploadTrigger, FileUploadPreview, FileUpload, FileUploadDropzone } from '@saas-ui/file-upload';
import {
  Form,
  FormLayout,
  Field,
  DisplayIf,
  SubmitButton,
} from '@saas-ui/react'

const AvatarTrainer: React.FC = () => {
  const supabase = createClient();
  const userProfile = useRecoilValue(userProfileState);
  const auth = useAuth();
  const { profileLoading, profileError } = useUserProfile();
  const userId = userProfile.id;
  const [modelId, setModelId] = useRecoilState(modelIdState);
  const [modelTrainingData, setModelTrainingData] = useRecoilState(modelTrainingDataState);
  const [numberOfImages, setNumberOfImages] = useRecoilState(numberOfImagesState);
  const [typeOfModel, setTypeOfModel] = useRecoilState(typeOfModelState);
  const [trainingModelName, setTrainingModelName] = useRecoilState(trainingModelNameState);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]); // State to manage uploaded files

  const toast = useToast();

  useEffect(() => {
    const subscription = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'trained_models' },
        (payload: any) => {
          toast({
            title: 'Model Training Complete!',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
          console.log("webhook payload: ", payload)
          // Corrected access to payload data
          const output = payload.new.id; // Assuming this is the correct path to the data
          setModelId(output); // Update state here
        })
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_name: trainingModelName,
          type_of_model: typeOfModel,
          uploaded_images: modelTrainingData,
          number_of_images: numberOfImages,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.status === "running") {
        toast({
          title: 'Processing',
          description: 'Your avatar model training has begun. You will be notified upon completion.',
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
        return;
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.error('Error running the workflow', error);
      toast({
        title: 'Error',
        description: `Error running the workflow: ${error}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      marginLeft="25px"
      mt={5}
      className="card-standard">
      <h1 className="title">
        Avatar Trainer
      </h1>


      <Form onSubmit={handleSubmit}>
        <VStack spacing={4} display="flex" flexDirection="column" alignItems="center" mb={4}>
          <FormControl isRequired>
     
            <Input
            boxShadow="lg"
              value={trainingModelName}
              onChange={(e) => setTrainingModelName(e.target.value)}
              placeholder="Enter model name" />
          </FormControl>

          <FileUpload
            maxFileSize={1024 * 1024}
            maxFiles={50}
            accept="image/*"
          >
            {({ files, deleteFile }) => (
              <FileUploadDropzone>
                {!files?.length ? (
                  <>
              
                    <FileUploadTrigger as={Button}>drop image / browse files</FileUploadTrigger>
                  </>
                ) : (
                  <HStack>
                    <FileUploadPreview file={files[0]} width="200px" />
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteFile(files[0]);
                      }}
                    >
                      Remove
                    </Button>
                  </HStack>
                )}
              </FileUploadDropzone>
            )}
          </FileUpload>

          <FormControl isRequired>
        
            <Select 
            boxShadow="md"
            onChange={(e) => setTypeOfModel(e.target.value)} placeholder="Select model type">
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="animal">Animal</option>
              <option value="vehicle">Vehicle</option>
              <option value="fantasy">Fantasy</option>
              <option value="object">Object</option>
            </Select>
          </FormControl>

          <Button boxShadow="sm" type="submit" size="lg" width="full" isLoading={isLoading}>
            Train Model
          </Button>
        </VStack>
      </Form>
    </Box>


  );
};

export default AvatarTrainer; 
