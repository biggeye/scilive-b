import React, { useEffect, useState } from "react";
import { Box, Select, Flex, Spacer, CircularProgress } from "@chakra-ui/react";
import { useRecoilState, useRecoilValueLoadable, useRecoilValue } from "recoil";
import { modelListState, selectedModelIdState, selectedModelConfigSelector } from "@/state/replicate/config-atoms";
import { fetchModelList } from "@/lib/modelServer";

const ToolOptions = () => {
  const [selectedModelId, setSelectedModelId] = useRecoilState<string>(selectedModelIdState);
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const models = await fetchModelList();
        setModelList(models);
      } catch (error) {
        console.error("Error fetching model list:", error);
        // Handle error, e.g., show a toast notification
      }
    };

    if (modelList.length === 0) {
      fetchData();
    }
  }, [modelList]);
  
  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedModelId = event.target.value;
    setSelectedModelId(newSelectedModelId);
  };

  if (modelList.length === 0) {
    return <CircularProgress size="xs" isIndeterminate />;
  }

  return (
    <Box marginBottom="3px" maxWidth="640px" p="5px">
      <Flex alignItems="center" justifyContent="center">
        <Spacer />
        <Select
          fontSize={{ base: "sm", md: "md" }}
          variant="flushed"
          value={selectedModelId}
          placeholder="Choose Image Editor"
          onChange={handleSelectionChange}
          size="xs"
        >
          {modelList.map((model: any) => (
            <option key={model.id} value={model.id}>{model.friendly_name}</option>
          ))}
        </Select>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default ToolOptions;
