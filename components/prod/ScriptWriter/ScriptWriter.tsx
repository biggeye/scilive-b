'use client';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { HStack, useToast, Box, VStack, Input, Button, Textarea, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { fetchVoiceoverScript } from '@/lib/dashboard/submit/leap/fetchVoiceoverScript';
import { voiceoverScriptState, webpageUrlState, userSummaryState } from '@/state/leap/scriptWriter-atoms';
import { hostNameState, podcastNameState } from '@/state/leap/scriptWriter-atoms';

const ScriptWriter = () => {
  const toast = useToast();

  // State from atoms
  const [webpageUrl, setWebpageUrl] = useRecoilState(webpageUrlState);
  const [userSummary, setUserSummary] = useRecoilState(userSummaryState);
  const [voiceoverScript, setVoiceoverScript] = useRecoilState(voiceoverScriptState);
  const [hostName, setHostName] = useRecoilState(hostNameState);
  const [podcastName, setPodcastName] = useRecoilState(podcastNameState);

  // Local state
  const [isScriptFetched, setIsScriptFetched] = useState(false);
  const [isUrlInput, setIsUrlInput] = useState(true); // Toggle state

  const handleScriptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setVoiceoverScript(event.target.value || '');

  const handleScriptFetch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form from submitting traditionally

    const input = isUrlInput ? { webpageUrl } : { userSummary };
    if (!input.webpageUrl && !input.userSummary) {
      toast({
        title: "Error",
        description: "Missing required input.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const script = await fetchVoiceoverScript(input);
      setIsScriptFetched(true); // Update based on actual operation success
      setVoiceoverScript(script);
      toast({
        title: "Success",
        description: "Script has been successfully fetched.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      setIsScriptFetched(false);
      toast({
        title: "Error",
        description: "Failed to fetch script.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      marginLeft="25px"
      marginRight="25px"
      mt={5}
      className="card-standard">
 
      <h1 className="title">ScriptWriter</h1>
      <form onSubmit={handleScriptFetch}>
        <VStack spacing={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="toggle-input" mb="0">
              Use URL
            </FormLabel>
            <Switch id="toggle-input" isChecked={isUrlInput} onChange={() => setIsUrlInput(!isUrlInput)} />
          </FormControl>
          <HStack>
            <Input 
            value={hostName} 
            onChange={(e) => setHostName(e.target.value)}
            placeholder="Name of Host" />
            <Input
            value={podcastName}
            onChange={(e) => setPodcastName(e.target.value)}
            placeholder="Name of Podcast" />
          </HStack>
          <Input
            value={isUrlInput ? webpageUrl : userSummary}
            onChange={(e) => isUrlInput ? setWebpageUrl(e.target.value) : setUserSummary(e.target.value)}
            placeholder={isUrlInput ? "Paste the link to the news article here" : "Paste your story here"}
          />
          <Button type="submit">Fetch Script</Button>
        </VStack>
      </form>

      <Box>
        <Textarea
          mb={4}
          value={voiceoverScript || ''}
          onChange={handleScriptChange}
          placeholder="The script will appear here"
          isDisabled={!isScriptFetched}
        />
        <Button onClick={() => toast({ title: "Feature not available", status: "info", duration: 5000, isClosable: true })} isDisabled={!isScriptFetched}>
          Generate Voiceover
        </Button>
      </Box>
    </Box>
  );
};

export default ScriptWriter;
