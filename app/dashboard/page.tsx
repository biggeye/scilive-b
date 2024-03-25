'use client'
import React, { Suspense, useState } from 'react';
import { useBreakpointValue, Skeleton, Tabs, Tab, TabList, TabPanels, TabPanel, VStack, Box, Grid, GridItem, Card, Link, Text } from '@chakra-ui/react';
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
  const [creator, setCreator] = useState(true);
  const columns = useBreakpointValue({ base: 2, md: 1 });

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
              <DisplayResults />  
            </Box>
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing={1}>
           // TODO ImageEditor gallery sidepanel opens, but with no contents
            <Box position="fixed" backdropFilter="blur(50px)" width="90%">
              <ImageEditor />
              <DisplayResults />   
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
    templateColumns={`repeat(${columns}, 1fr)`} // Set the number of columns dynamically
   padding="10px" margin="10px" display="flex" position="relative" gap="6"
    >
      <GridItem bgColor="primary.50" area="createDisplay">
        <DisplayResults />
        {creator ? ( <ImageCreator /> ) : ( <ImageEditor />)}
      </GridItem>
      <GridItem bgColor="primary.100" area="scriptWriter">
       <ScriptWriter />
      </GridItem>
      <GridItem bgColor="primary.200" area="avatar">
        <AvatarCreator />
      </GridItem>
      <GridItem bgColor="primary.300" area="trainer">
        <AvatarTrainer />
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