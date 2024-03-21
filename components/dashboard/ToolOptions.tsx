import React, { useEffect } from "react";
import { Text, Spacer, Box, Select, Flex, Progress } from "@chakra-ui/react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { selectedModelIdState, modelListSelector } from "@/state/replicate/config-atoms";
import { fetchTxt2ImgModels, fetchImg2ImgModels } from "@/lib/modelServer";
import { currentPageState } from '@/state/user/user_state-atoms';
import type { SelectedModel } from "@/types"; // Import the type definition for SelectedModel if available

type ToolOptionsProps = {
  localPage: "createImage" | "editImage" | "allModels"
}

const ToolOptions = ({ localPage }: ToolOptionsProps) => {
  const currentPage = useRecoilValueLoadable(currentPageState);
  const [selectedModelId, setSelectedModelId] = useRecoilState(selectedModelIdState);
  const modelList = useRecoilValueLoadable(modelListSelector);



  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    setSelectedModelId(newSelectedModelId);
  };

  if (modelList.state === 'hasValue') {
    const models = modelList.contents;
    return (
      <Box marginBottom="3px" maxWidth="640px" p="5px">
        <Flex alignItems="center" justifyContent="center">
          <Spacer />
          <Text fontSize={{ base: "sm", md: "md" }}>MODEL:  {"   "}</Text>
          <Spacer />
          <Select fontSize={{ base: "sm", md: "md" }} variant="flushed" width="75%" value={selectedModelId} onChange={handleSelectionChange} size="xs">
            {models?.map((model: SelectedModel) => (
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
