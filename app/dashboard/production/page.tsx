'use client'
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  Card, Grid, GridItem, Tabs, TabList, TabPanels, Tab, TabPanel, Button, Box, VStack, HStack, useToast
} from "@chakra-ui/react";

import ScriptWriter from '@/components/dashboard/ScriptWriter';
import AvatarCreator from '@/components/dashboard/AvatarCreator';

import { viewModeState } from '@/state/user/user_state-atoms';


const VideoProduction = () => {
  const viewMode = useRecoilValue(viewModeState);

  const renderTabs = () => (
    <Card>
      <Tabs
        fontSize={{ base: "sm", md: "md" }}
        variant="enclosed-colored"
      >
        <TabList mb="1em">
          <Tab>Avatar</Tab>
          <Tab>Script</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <AvatarCreator />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4}>
              <ScriptWriter />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );

  const renderGrid = () => (
    <Grid
      templateAreas={{
        lg: `"avatar script"
           "footer footer "`,
        base: `"avatar"
                          
                              "script"
                              "footer"` }}
      gridTemplateColumns={{ base: '90vw', lg: '35vw 35vw' }}
      gridTemplateRows={{ base: '4', lg: '2' }}
      h='92vh'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
      maxW="100vw"
    >
      <GridItem pl='2' area={'avatar'}>
        <Box w="100%">
          <AvatarCreator />
        </Box>
      </GridItem>
      <GridItem pl='2' area={'script'}>
        <Box w="100%">
          <ScriptWriter />
        </Box>
      </GridItem>
      <GridItem pl='2' area={'footer'}>

      </GridItem>
    </Grid>

  );

  return (
    <Box>
      {viewMode === 'tabs' ? renderTabs() : renderGrid()}
    </Box>
  );
};

export default VideoProduction;
