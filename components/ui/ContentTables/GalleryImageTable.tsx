'use client'
import React, { useEffect, useState } from 'react';
import { Box, Link, Text, Card } from '@chakra-ui/react';
import { DataTable, ColumnDef, Web3Address } from '@saas-ui/react';
import { fetchGalleryImages } from '@/lib/galleryServer';
import { GalleryImage } from '@/types';

const GalleryImageTable = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const images: GalleryImage[] = await fetchGalleryImages();
      setGalleryImages(images);
    };
    fetchData();
  }, []);


  const columns: ColumnDef<GalleryImage>[] = [
    {
      header: 'Prompt',
      accessorKey: 'prompt',
      cell: ({ row }) => (
        <Text isTruncated noOfLines={1} maxW="30vw" title={row.original.prompt}>
          {row.original.prompt}
        </Text>
      ),
    },
    {
      header: 'Open Image',
      accessorKey: 'url',
      cell: ({ row }) => (
        <Link href={row.original.url} isExternal>
          (open image)
        </Link>
      ),
    },
    {
      header: 'Model',
      accessorKey: 'friendly_name',
      cell: ({ row } ) => (
        <Text>{row.original.friendly_name}</Text>
      )
    }

  ];

  return (
    <Box as="section" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" margin={5}>
      <Card p={5}>
        <DataTable
          columns={columns}
          data={galleryImages}
          isSortable
          onSelectedRowsChange={(selected) => console.log(selected)}
          size={{ base: 'xs', md: 'sm', lg: 'md' }}
        />
      </Card>
    </Box>
  );
};

export default GalleryImageTable;
