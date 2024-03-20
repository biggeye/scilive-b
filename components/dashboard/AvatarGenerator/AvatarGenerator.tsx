
'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Heading, HStack, Box, Button, CircularProgress, Grid, GridItem, Image, useToast } from '@chakra-ui/react';
import { FileUploadPreview, FormLayout, Form, Field, FileUpload, FileUploadDropzone, FileUploadTrigger } from '@saas-ui/react'; // Added FileUploadTrigger import
import { modelIdState, dataset } from '@/state/leap/trainedModel-atoms';
import { createClient } from '@/utils/supabase/client';
import { userProfileState } from '@/state/user/user_state-atoms';
import { useRecoilValue } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';

const AvatarGenerator: React.FC = () => {
  const supabase = createClient();
  const userProfile = useRecoilValue(userProfileState);
  const auth = useAuth();
  const { profileLoading, profileError } = useUserProfile();
  const modelId = useRecoilValue(modelIdState);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const toast = useToast();


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
    
      <Card 
      marginLeft="25px"
      mt={5} 
      className="card-standard">
           <CardHeader>
        <div as="h1" className="title">
          Avatar Generator
        </div>

      </CardHeader>
      <Form onSubmit={handleSubmit}>
        <FormLayout columns={[1, null, 2]}>
         
        </FormLayout>
      </Form>
      {isLoading ? (
        <CircularProgress isIndeterminate color="blue.300" />
      ) : (
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={4}>
          {images.map((imgUrl, index) => (
            <GridItem key={index} colSpan={1}>
              <Image src={imgUrl} alt={`Avatar Image ${index + 1}`} />
              <Checkbox isChecked={selectedImageIndex === index} onChange={() => setSelectedImageIndex(index)} />
            </GridItem>
          ))}
        </Grid>
      )}
      <Button
        isDisabled={selectedImageIndex === null}
        onClick={() => {
          if (selectedImageIndex !== null) {
            // setAvatarUrl(images[selectedImageIndex]); // setAvatarUrl is not defined
          }
        }}
      >
        Select Avatar
      </Button>
    </Card>
  );
};

export default AvatarGenerator;
