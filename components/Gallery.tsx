import React, { useState } from 'react';
import {
  HStack,
  Link,
  Box,
  Image,
  SimpleGrid,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  useBreakpointValue,
  Input,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Tooltip
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@/components/icons/UI';
import { GalleryProps, GalleryItem } from '@/types';

const Gallery: React.FC<GalleryProps> = ({ items, onEdit, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [useTable, setUseTable] = useState(false); // State to track rendering as table

  const handleSelectItem = (content_id: string) => {
    setSelectedItem(content_id);
    onOpen();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pageNumber = parseInt(inputValue, 10);
    // No need to check for valid page number or update current page in table view
  };

  return (
    <Box width="100%" padding="10px" paddingLeft={{ base: "2px", md: "55px" }} paddingRight={{ base: "2px", md: "5px" }}>
      <Box mb={4}>
        <Switch onChange={() => setUseTable(!useTable)} mr={2} />
        <Text as="span">Use Table View</Text>
      </Box>

      {useTable ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Prompt</Th>
              <Th>Model Name</Th>
              <Th>Model Type</Th>
              <Th>Link</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item: any, content_id: any) => (
              <Tr key={item.content_id}>
                <Td>
                  <Text maxWidth="60%">{item.prompt}</Text></Td>
                <Td>
                  <Text>{item.friendly_name}</Text></Td>
                <Td>
                  <Text>{item.model_type}</Text></Td>
                <Td>
                  <Link href={item.url}>Open</Link></Td>
                <Td>
                  <IconButton aria-label="Delete item" icon={<DeleteIcon />} size="sm" onClick={() => onDelete(item.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="4">
          {items.map((item: any, content_id: any) => (
            <Box key={item.content_id} pos="relative" boxShadow="md" borderRadius="lg" overflow="hidden">
              {item.script ? (
                <VStack>
                  <HStack display="flex" justifyContent="space-between">
                    <Text>{item.friendly_name}</Text><Text>{item.model_type}</Text>
                  </HStack>
                  <Text
                    maxHeight="100px"
                  >{item.script}</Text>
                </VStack>
              ) : (
                <VStack>
                  <Tooltip label={item.prompt} size="lg">
                    <Image src={item.url} alt={item.title || 'Gallery item'} objectFit="cover" w="full" h="full" onClick={() => handleSelectItem(item.content_id)} />
                    
                  </Tooltip>
                 <HStack><Text fontSize="xs">{item.friendly_name}</Text><Text fontSize="xs">{item.model_type}</Text></HStack>
                </VStack>
              )}
              <Box pos="absolute" top="2" right="2" display="flex" alignItems="center">
                <IconButton aria-label="Edit item" icon={<EditIcon />} size="xs" onClick={() => onEdit(item.url)} mr="2" />
                <IconButton aria-label="Delete item" icon={<DeleteIcon />} size="xs" onClick={() => onDelete(item.content_id)} />
              </Box>
              {item.title && (
                <Text fontSize="sm" color="white" pos="absolute" bottom="2" left="2" noOfLines={1}>
                  {item.title}
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Box display="flex" justifyContent="center" marginTop="4" marginBottom="10">
        <Box as="form" onSubmit={handleFormSubmit} display="flex" justifyContent="center">
          <HStack>
          <Input type="number" min="1" value={inputValue} width="50px" onChange={handleInputChange} />
          <Button type="submit">Go to page</Button>
          </HStack>
        </Box>
      </Box>

      {selectedItem && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Image src={items.find((item) => item.content_id === selectedItem)?.url} alt="Selected item" maxW="full" maxH="60vh" objectFit="contain" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Gallery;
