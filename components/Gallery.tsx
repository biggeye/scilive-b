import React, { useState } from 'react';
import {
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
  Input
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@/components/icons/UI';

interface GalleryProps {
  items: {
    id: string;
    url: string;
    title?: string;
    prompt?: string;
    content?: string;
  }[];
  onEdit: (url: string) => void;
  onDelete: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, onEdit, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  // Dynamically set items per page based on the current breakpoint
  const itemsPerPage = useBreakpointValue({ base: 4, md: 6, lg: 8 }) ?? 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
    onOpen();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };



  // Add a function to handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Parse the input value to an integer
    const pageNumber = parseInt(inputValue, 10);

    // Check if the page number is valid
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Box width="100%" padding="10px" paddingLeft={{ base: "2px", md: "55px" }} paddingRight={{ base: "2px", md: "5px" }}>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="4">
        {currentItems.map((item) => (
          <Box key={item.id} pos="relative" boxShadow="md" borderRadius="lg" overflow="hidden">
            {item.content ? (
              <Text>{item.content}</Text>
            ) : (
              <Image src={item.url} alt={item.title || 'Gallery item'} objectFit="cover" w="full" h="full" onClick={() => handleSelectItem(item.id)} />
            )}
            <Box pos="absolute" top="2" right="2" display="flex" alignItems="center">
              <IconButton aria-label="Edit item" icon={<EditIcon />} size="sm" onClick={() => onEdit(item.url)} mr="2" />
              <IconButton aria-label="Delete item" icon={<DeleteIcon />} size="sm" onClick={() => onDelete(item.id)} />
            </Box>
            {item.title && (
              <Text fontSize="sm" color="white" pos="absolute" bottom="2" left="2" noOfLines={1}>
                {item.title}
              </Text>
            )}
          </Box>
        ))}
      </SimpleGrid>
      <Box display="flex" justifyContent="center" marginTop="4" marginBottom="10">
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 1}>
          Previous
        </Button>
        <Text marginLeft="2" marginRight="2">
          Page {currentPage} of {Math.ceil(items.length / itemsPerPage)}
        </Text>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </Button>
        
      </Box>
      <Box as="form" onSubmit={handleFormSubmit} display="flex" justifyContent="center" marginTop="4" marginBottom="10">
        <Input
          type="number"
          min="1"
          max={totalPages}
          value={inputValue}
          onChange={handleInputChange}
          marginRight="2"
        />
        <Button type="submit">Go to page</Button>
      </Box>
     
      {selectedItem && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Image src={items.find((item) => item.id === selectedItem)?.url} alt="Selected item" maxW="full" maxH="60vh" objectFit="contain" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Gallery;
