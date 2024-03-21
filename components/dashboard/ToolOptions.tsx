import React, { useEffect, useState } from "react";
import { Text, Spacer, Box, Select, Flex, Progress } from "@chakra-ui/react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { selectedModelIdState, selectedModelConfigSelector } from "@/state/replicate/config-atoms";
import type { ModelList } from "@/types"; // Import the type definition for SelectedModel if available
import { fetchModels } from "@/lib/modelServer";

const ToolOptions = ({localPage}: any) => {
  const [selectedModelId, setSelectedModelId] = useRecoilState<string>(selectedModelIdState);
  const [modelList, setModelList] = useState([]);
  const selectedModelConfig = useRecoilValueLoadable(selectedModelConfigSelector);

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    setSelectedModelId(newSelectedModelId);
  };

useEffect(()  => {
  const modelFetch = async () => {
  const modelData = await fetchModels();
  setModelList(modelData as any)
}; modelFetch();}, [])

  return (
    <Box marginBottom="3px" maxWidth="640px" p="5px">
      <Flex alignItems="center" justifyContent="center">
        <Spacer />
        <Text fontSize={{ base: "sm", md: "md" }}>MODEL:  {"   "}</Text>
        <Spacer />
        <Select fontSize={{ base: "sm", md: "md" }} variant="flushed" width="75%" value={selectedModelId} onChange={handleSelectionChange} size="xs">
          {modelList.map((model: any, id) => (
            <option key={model.id} value={model.id}>{model.friendly_name}</option>
          ))}
        </Select>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default ToolOptions;
