'use client'
import React, { useState, useEffect } from 'react';
import { Textarea, Card, CardHeader, Heading, HStack, Box, Button, CircularProgress, Grid, GridItem, Image, useToast, Select, VStack } from '@chakra-ui/react';
import { FileUploadPreview, FormLayout, Form, Field, FileUpload, FileUploadDropzone, FileUploadTrigger } from '@saas-ui/react'; // Added FileUploadTrigger import
import { trainedModelsSelector } from '@/state/leap/trainedModel-atoms';
import { fetchTrainedModels } from '@/lib/modelServer';
import { createClient } from '@/utils/supabase/client';
import { userProfileState } from '@/state/user/user_state-atoms';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';

const AvatarGenerator: React.FC = () => {
  const supabase = createClient();
  const userProfile = useRecoilValue(userProfileState);
  const trainedModel = useRecoilValue(trainedModelsSelector);

  const [prompt, setPrompt] = useState("");
  const [negative_prompt, set_negative_prompt] = useState("");

  const auth = useAuth();
  const { profileLoading, profileError } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const toast = useToast();


  /*
    useEffect(() => {
      const subscription = supabase
        .channel('custom-insert-channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'trained_models_generated' }, (payload) => {
          console.log('Change received!', payload);
          if (payload.new && payload.new.url) {
            setImages(currentImages => {
              const updatedImages = [...currentImages, payload.new.url];
              // Assume loading is complete once an image is successfully received and added
              setIsLoading(false);
              return updatedImages;
            });
          }
        })
        .subscribe();
      return () => {
        supabase.removeChannel(subscription);
      };
    }, []);
    */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/generator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_id: modelId,
          prompt: prompt, // Replace 'Your prompt here' with the actual prompt
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData.status === "running") {
        toast({
          title: 'Processing',
          description: 'Your avatar generator has started. You will be notified upon completion.',
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
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
    }
  };

  return (
    <Box 
    
    marginLeft="25px" marginRight="25px" mt={5} className="card-standard">
      <h1 className="title">Avatar Generator</h1>
      <Form onSubmit={handleSubmit}>
        <FormLayout columns={{ base: "1", md: "2" }}>
          {isLoading ? (
            <CircularProgress isIndeterminate color="primary.300" />
          ) : (
            <>
              <VStack>
                <Select width="90%">
                  {trainedModel.map((trainedModel, index) => (
                    <option key={trainedModel.id} label={trainedModel.model_name}>
                      {trainedModel.model_name}
                    </option>
                  ))}
                </Select>
                <Grid width="90%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem colSpan={1}>
                    <Textarea value={prompt} placeholder="describe the entire image your model should be portrayed in" onChange={(e) => setPrompt(e.target.value)} />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Textarea value={negative_prompt} placeholder="specify anything you do not want to see in the image" onChange={(e) => setNegativePrompt(e.target.value)} />
                  </GridItem>
                  {images.map((imgUrl, index) => (
                    <GridItem key={index} colSpan={1}>
                      <Image src={imgUrl} alt={`Avatar Image ${index + 1}`} />
                      <Checkbox isChecked={selectedImageIndex === index} onChange={() => setSelectedImageIndex(index)} />
                      <Button
                        isDisabled={selectedImageIndex === null}
                        onClick={() => {
                          setSelectedImageIndex(index);
                        }}
                      >
                        Select Avatar
                      </Button>
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </>
          )}
        </FormLayout>
      </Form>
    </Box>

  );
};

export default AvatarGenerator;
