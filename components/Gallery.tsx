'use client'
import React from 'react';
import {
  Box,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@/components/icons/UI';
// Define the props the Gallery component expects
interface GalleryProps {
  items: {
    id: string;
    url?: string;
    title?: string;
    prompt?: string;
    content?: string; // Add the content property
  }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, onEdit, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);



  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
    onOpen();
  };

  return (
    <Box width="100%" padding="10px" paddingLeft={{base: "2px", md: "55px"}} paddingRight={{base: "2px", md: "5px"}}>
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="4">
      {items.map((item) => (
        <Box key={item.id} pos="relative" boxShadow="md" borderRadius="lg" overflow="hidden">
          {item.content ? (
            <Text>{item.content}</Text> // Render Text component if content exists
          ) : (
            <Image src={item.url} alt={item.title || 'Gallery item'} objectFit="cover" w="full" h="full" onClick={() => handleSelectItem(item.id)} />
          )}<Box pos="absolute" top="2" right="2" display="flex" alignItems="center">
              <IconButton aria-label="Edit item" icon={<EditIcon />} size="sm" onClick={() => onEdit(item.id)} mr="2" />
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
