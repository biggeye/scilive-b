import AvatarCreator from "@/components/dashboard/AvatarCreator";
import AvatarTrainer from "@/components/dashboard/AvatarTrainer";
import AvatarGenerator from "@/components/dashboard/AvatarGenerator";

import { Card, VStack, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const AvatarCreatorPage = () => {

    return (
        <VStack mt={10}>
        <Card boxShadow="xl" rounded="md" bg="white" p={5} width={{ base: '80vw', md: '60vw' }}>
        <Tabs
        fontSize={{ base: "sm", md: "md" }}
        variant="enclosed-colored"
        >
            <TabList>
                <Tab>Avatar Creator</Tab>
                <Tab>Avatar Trainer</Tab>
                <Tab>Avatar Generator</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <VStack>
                    <AvatarCreator />
                    </VStack>
                </TabPanel>
                <TabPanel>
                    <VStack>
                    <AvatarTrainer />
                    </VStack>
                </TabPanel>
                <TabPanel>
                    <VStack>
                        <AvatarGenerator />
                    </VStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </Card>
        </VStack>
    )
}

export default AvatarCreatorPage;