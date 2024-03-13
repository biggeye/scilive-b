import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Canvas } from './Canvas'; // hypothetical component for the canvas
import { DetailsPanel } from './DetailsPanel'; // hypothetical component for the details panel

const CanvasDashboard = () => {
 /* const [selectedObject, setSelectedObject] = useState(null);

  const handleSelectObject = (object) => {
    setSelectedObject(object);
  };
*/
  return (
    <Flex>
      <Box flex="1" minH="100vh" bg="gray.50">
        {/* The CanvasArea is a wrapper component for your dynamic canvas */}
        <Canvas onSelectObject={handleSelectObject} />
      </Box>
      <Box w="350px" bg="white" borderLeft="1px" borderColor="gray.200">
        {/* DetailsPanel shows the properties of the selected object */}
        <DetailsPanel selectedObject={selectedObject} />
      </Box>
    </Flex>
  );
};

export default CanvasDashboard;
