'use client'
import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
// import UI
import { useToast, Grid, GridItem, FormLabel, CardHeader, Heading, Card, Button, Textarea, Box, VStack, HStack, Input, InputGroup } from '@chakra-ui/react';
import { Form, FormLayout } from '@saas-ui/react';
// import state
import { globalLoadingState } from '@/state/replicate/prediction-atoms';
import { voiceoverScriptState, webpageUrlState, hostNameState, podcastNameState } from '@/state/leap/scriptWriter-atoms';
import { userProfileState } from '@/state/user/user_state-atoms';
import { fetchVoiceoverScript } '@/lib/dashboard/submit/leap/fetchVoiceoverScript';

const ScriptWriter = () => {
  const toast = useToast();
  const auth = useAuth();
  const userProfile = useRecoilValue(userProfileState);
  const userId = userProfile?.id;
  const { profileLoading, profileError } = useUserProfile();

  // global state
  const globalLoading = useRecoilValue(globalLoadingState);
  const [hostName, setHostName] = useRecoilState(hostNameState);
  const [podcastName, setPodcastName] = useRecoilState(podcastNameState);
  const [webpageUrl, setWebpageUrl] = useRecoilState(webpageUrlState);
  const [voiceoverScript, setVoiceoverScript] = useRecoilState(voiceoverScriptState);

  // local state
  const [isScriptFetched, setIsScriptFetched] = useState(false);

  const handleScriptChange = (event) => setVoiceoverScript(event.target.value || '');

  const handleScriptFetch = async (event) => {
    event.preventDefault();
    if (hostName && podcastName && webpageUrl || user_summary && userId) {
      try {
        const data = await fetchVoiceoverScript(
          hostName,
          podcastName,
          webpageUrl || user_summary,
          userId
        );
        if (data) {
          setIsScriptFetched(true);
          toast({
            title: "Processing",
            description: "Script is generating",
            status: "success",
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
      }
    } else {
      toast({
        title: "Error",
        description: "missing required inputs",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
    <Box
      marginLeft="25px"
      marginRight="25px"
      mt={5}
      className="card-standard">
      <h1 className="title">
        scr!ptWrit3r
      </h1>

      <form onSubmit={handleScriptFetch} display="flex" mb={4}>
          <VStack>
            <Input
              margin="5px"
              mb={4}
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Name of the Show's Host"
            />
            <Input
              margin="5px"
              mb={4}
              value={podcastName}
              onChange={(e) => setPodcastName(e.target.value)}
              placeholder="Name of the Show"
            />
            <Input
              mb={4}
              value={webpageUrl}
              onChange={(e) => setWebpageUrl(e.target.value)}
              placeholder="Enter the web article URL here"
            />
            <Button
              type="submit"
            >
              Fetch Script
            </Button>
          </VStack>
      </form>
      <Card className="doogieVibe">
        <Textarea
          mb={4}
          value={voiceoverScript}
          onChange={handleScriptChange}
          placeholder="The script will appear here"
          isDisabled={!isScriptFetched}
        />
        <Button
          onClick={generateVoiceover}
          isDisabled={!isScriptFetched}
        >
          Generate Voiceover
        </Button>
      </Card>
    </Box >
  );
};
export default ScriptWriter;
