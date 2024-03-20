'use client'
import React, { Suspense } from 'react';
import { Skeleton, Tabs, Tab, TabList, TabPanels, TabPanel, VStack, Box, Grid, GridItem, Card, Link, Text } from '@chakra-ui/react';
import ImageCreator from '@/components/dashboard/ImageCreator';
import ImageEditor from '@/components/dashboard/ImageEditor';
import DisplayResults from '@/components/dashboard/DisplayResults';
import ScriptWriter from '@/components/dashboard/ScriptWriter';
import AvatarCreator from '@/components/dashboard/AvatarCreator';
import AvatarTrainer from '@/components/dashboard/AvatarTrainer';
import AvatarGenerator from '@/components/dashboard/AvatarGenerator';

import { useRecoilValue } from 'recoil';
import { viewModeState } from '@/state/user/user_state-atoms';

const DashboardPage = () => {
  const viewMode = useRecoilValue(viewModeState);

  const renderTabs = () => (
    <Tabs
      fontSize={{ base: "sm", md: "md" }}
      variant="enclosed-colored"
    >
      <TabList mb="1em">
        <Tab>Image Creator</Tab>
        <Tab>Image Editor</Tab>
        <Tab>Script Writer</Tab>
        <Tab>Avatar Creator</Tab>
        <Tab>Avatar Trainer</Tab>
        <Tab>Avatar Generator</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <VStack spacing={1}>
           // TODO toolOptions  is rendering incorrect list of models for createImage / imageCreator
            <Box position="fixed" backdropFilter="blur(50px)" width="90%">
              <ImageCreator />
              <DisplayResults localPage="createImage" />  
            </Box>
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={1}>
           // TODO ImageEditor gallery sidepanel opens, but with no contents
            <Box position="fixed" backdropFilter="blur(50px)" width="90%">
              <ImageEditor />
              <DisplayResults localPage="editImage" />   
            </Box>
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={1}>
            <ScriptWriter />
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={1}>
            <AvatarCreator />
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={1}>
            <AvatarTrainer />
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={1}>
            <AvatarGenerator />
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )

  const renderGrid = () => (

    <Grid
    >
      <GridItem area="createDisplay">
        <DisplayResults localPage="createImage" />
        <ImageCreator />
      </GridItem>
      <GridItem area="editDisplay">
        <DisplayResults localPage="editImage" />
        <ImageEditor />
      </GridItem>
      <GridItem area="panel">
        <Box
          w="55vw"
          h="auto"
          bgColor="silver"
          borderRadius="md">
        </Box>
      </GridItem>
      <GridItem area="avatar">
        <AvatarCreator />
      </GridItem>
      <GridItem area="script">
        <ScriptWriter />
      </GridItem>
      <GridItem area="footer">

      </GridItem>
    </Grid>
  );

  return (
    <Box>
      {viewMode === 'tabs' ? renderTabs() : renderGrid()}
    </Box>
  );
};

export default DashboardPage;