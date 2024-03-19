'use client'
import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
// import UI
import { useToast, Grid, GridItem, FormLabel, CardHeader, Heading, Card, Button, Textarea, Box, VStack, HStack, Input, InputGroup } from '@chakra-ui/react';
import { Form, FormLayout } from '@saas-ui/react';
// import state
import { voiceoverScriptState, webpageUrlState, hostNameState, podcastNameState } from '@/state/leap/scriptWriter-atoms';
import { userProfileState } from '@/state/user/user_state-atoms';
import { fetchVoiceoverScript } from '@/lib/dashboard/submit/leap/fetchVoiceoverScript';

const ScriptWriter = () => {
  const toast = useToast();
  const auth = useAuth();
  const userProfile = useRecoilValue(userProfileState);
  const userId = userProfile.id;
  const { profileLoading, profileError } = useUserProfile();

// global state
  const [hostName, setHostName] = useRecoilState(hostNameState);
  const [podcastName, setPodcastName] = useRecoilState(podcastNameState);
  const [webpageUrl, setWebpageUrl] = useRecoilState(webpageUrlState);
  const [voiceoverScript, setVoiceoverScript] = useRecoilState(voiceoverScriptState);

// local state
  const inputsDisabled = voiceoverScript.trim().length > 0;
  const [isScriptFetched, setIsScriptFetched] = useState(false);

  const handleScriptChange = (event) => setVoiceoverScript(event.target.value || '');

  const handleScriptFetch = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("hostName: ", hostName, "podcastName: ", podcastName, "webpageUrl: ", webpageUrl, "userId: ", userId);
     if (hostName && podcastName && webpageUrl && userId) {
    try {
       const data = await fetchVoiceoverScript(
        hostName, 
        podcastName, 
        webpageUrl, 
        userId
        ); // Make sure userId is defined
      if (data) {
             console.log(data);
      //  setIsScriptFetched(true);
        toast({
          title: "Processing",
          description: `Script is generating, Prediction ID: ${data.prediction_id}`,
          status: "sucess",
          duration: 5000,
          isClosable: true,
        })
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Please enter a webpage URL.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } } else {
      return error ("missing required inputs")
    }
  };

  const generateVoiceover = () => {
    toast({
      title: "Success",
      description: "This feature is not yet available.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Grid templateAreas={`"topCard"
                         "bottomCard"`}
      templateRows="2"
    >
      <GridItem area="topCard">
        <Card
          className="card-standard"
          borderColor="onyx"
          borderWidth="0.5px"
          p={{ base: "1", md: "2", lg: "4" }}
          maxW="lg">
          <Form onSubmit={handleScriptFetch} display="flex" flexDirection="column" alignItems="center" mb={4}>
            <CardHeader alignItems="center" justifyContent="space-between">
              <div as="h1" className="title">
                scr!ptWrit3r
              </div>
            </CardHeader>
            <FormLayout>
              <InputGroup>
              <div as="h3" className="subtitle">Host</div>
              <Input
              margin="5px"
                mb={4}
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                disabled={inputsDisabled} // Disable based on voiceoverScript
                placeholder="Host of the show"
              />
              <div as="h3" className="subtitle">Podcast Name</div>
              <Input
              margin="5px"
                mb={4}
                value={podcastName}
                onChange={(e) => setPodcastName(e.target.value)}
                disabled={inputsDisabled} // Disable based on voiceoverScript
                placeholder="Name of the podcast"
              />
              </InputGroup>
              <Input
                mb={4}
                value={webpageUrl}
                onChange={(e) => setWebpageUrl(e.target.value)}
                disabled={inputsDisabled} // Disable based on voiceoverScript
                placeholder="Enter the web article URL here"
              />
              <Button
                type="submit"
              >
                Fetch Script
              </Button>
            </FormLayout>
          </Form>
        </Card>
      </GridItem>

      <GridItem area="bottomCard">
        <Card className="doogieVibe">
          <Textarea
            mb={4}
            value={voiceoverScript}
            onChange={handleScriptChange}
            placeholder="The script will appear here"
            isDisabled={!inputsDisabled} // Enable when voiceoverScript is received
          />
       <Button
  onClick={generateVoiceover}
  isDisabled={!isScriptFetched} // Enable the button only after the script is fetched
>
  Generate Voiceover
</Button>
        </Card>
      </GridItem>

    </Grid>
  );
};

export default ScriptWriter;
