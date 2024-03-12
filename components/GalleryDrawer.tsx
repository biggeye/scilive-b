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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { ContextMenu,
ContextMenuItem,
ContextMenuList,
ContextMenuTrigger } from '@saas-ui/react';
import { EditIcon, DeleteIcon } from '@/components/icons';

// Define the props the Gallery component expects
interface GalleryProps {
  items: {
    content_id: string;
    url: string;
    title?: string;
    prompt?: string;
  }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const GalleryDrawer: React.FC<GalleryProps> = ({ items, onEdit, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
    onOpen();
  };

  return(
    
<Drawer placement="right" onClose={onClose} isOpen={isOpen}>
<DrawerOverlay />
<DrawerContent>
  <DrawerCloseButton />
  <DrawerHeader>Your Gallery</DrawerHeader>
  <DrawerBody>
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {items.map((item) => (
        <ContextMenu key={item.content_id}>
          <ContextMenuTrigger>
            <GridItem cursor="pointer">
              <Image src={item.url} alt={item.title} boxSize="75px" objectFit="cover" />
              <Text fontSize="sm" mt={2}>{item.title}</Text>
            </GridItem>
          </ContextMenuTrigger>
          <ContextMenuList>
            <ContextMenuItem onClick={() => onEdit(item.url)}>Edit</ContextMenuItem>
            <ContextMenuItem onClick={() => onDelete(item.content_id)}>Delete</ContextMenuItem>

          </ContextMenuList>
        </ContextMenu>
      ))}


    </Grid>


  </DrawerBody>
</DrawerContent>
</Drawer>
  )
      }
export default GalleryDrawer;