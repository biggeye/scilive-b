'use client'
import React, { useEffect, useState } from 'react';
import { Box, Link, Text, Card } from '@chakra-ui/react';
import { DataTable, ColumnDef, Web3Address } from '@saas-ui/react'; // Adjust if Web3Address import is incorrect
import { fetchGalleryImages } from '@/lib/galleryServer'; // Assume this is a corrected fetch function
import { GalleryImage } from '@/types';

const GalleryImageTable = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Assuming fetchGalleryImages is now correctly implemented to fetch the data
      const images: GalleryImage[] = await fetchGalleryImages();
      setGalleryImages(images);
    };
    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const columns: ColumnDef<GalleryImage>[] = [
    {
      header: 'Prompt',
      accessorKey: 'prompt',
      cell: ({ row }) => (
        <Text isTruncated noOfLines={1} maxW="50vw" title={row.original.prompt}>
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
      header: 'Date Created',
      accessorKey: 'created_at',
      cell: ({ row }) => {
        // Format the date before rendering
        const formattedDate = formatDate(row.original.created_at);
        return <Text noOfLines={1}>{formattedDate}</Text>;
      },
    },

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
