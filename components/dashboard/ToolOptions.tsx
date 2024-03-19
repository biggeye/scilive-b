import React, { useEffect } from "react";
import { Text, Spacer, Box, Select, Flex, Progress } from "@chakra-ui/react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { selectedModelConfigSelector, selectedModelIdState } from "@/state/replicate/config-atoms";
import { fetchTxt2ImgModels, fetchImg2ImgModels } from "@/lib/modelServer";
import { currentPageState } from '@/state/user/user_state-atoms';
import type { SelectedModel } from "@/types"; // Import the type definition for SelectedModel if available

type ToolOptionsProps = {
  localPage: string | null
}

const ToolOptions = ({ localPage }: ToolOptionsProps) => {
  const currentPage = useRecoilValueLoadable(currentPageState);
  const [selectedModelId, setSelectedModelId] = useRecoilState(selectedModelIdState);
  const selectedModelConfig = useRecoilValueLoadable(selectedModelConfigSelector);

  useEffect(() => {
    const effectivePage = localPage || currentPage.contents;
    fetchModels(effectivePage);
  }, [currentPage.contents, localPage]);

  const fetchModels = async (page: string) => {
    try {
      switch (page) {
        case "createImage":
          await fetchTxt2ImgModels();
          break;
        case "editImage":
          await fetchImg2ImgModels();
          break;
        // Add more cases as needed
        default:
          return; // Or handle it accordingly
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    setSelectedModelId(newSelectedModelId);
  };

  if (selectedModelConfig.state === 'loading') {
    return (
      <Box marginBottom="3px" maxWidth="640px" p="5px">
        <Flex alignItems="center" justifyContent="center">
          <Spacer />
          <Text fontSize={{ base: "sm", md: "md" }}>MODEL:  {"   "}</Text>
          <Spacer />
          <Progress isIndeterminate={true} />
          <Spacer />
        </Flex>
      </Box>
    );
  }

  if (selectedModelConfig.state === 'hasValue') {
    const { modelData } = selectedModelConfig.contents;
    return (
      <Box marginBottom="3px" maxWidth="640px" p="5px">
        <Flex alignItems="center" justifyContent="center">
          <Spacer />
          <Text fontSize={{ base: "sm", md: "md" }}>MODEL:  {"   "}</Text>
          <Spacer />
          <Select fontSize={{ base: "sm", md: "md" }} variant="flushed" width="75%" value={selectedModelId} onChange={handleSelectionChange} size="xs">
            {modelData?.map((model: SelectedModel) => (
              <option key={model.id} value={model.id}>{model.friendlyname || model.name}</option>
            ))}
          </Select>
          <Spacer />
        </Flex>
      </Box>
    );
  }

  return null; // Handle other states if needed
};

export default ToolOptions;
