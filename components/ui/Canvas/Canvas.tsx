'use client'
import React, { useState } from 'react';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from '@saas-ui/file-upload'
import {
  Grid,
  Box,
  Input,
  Button,
  Select,
  VStack,
  HStack,
  Text,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { PenToolIcon, CpuIcon, FileIcon } from 'lucide-react';
import ToolOptions from '@/components/prod/ToolOptions';
import DisplayResults from '@/components/prod/DisplayResults';

type CanvasComponentProps = {
  children: React.ReactNode
}
function CanvasComponent({children}: CanvasComponentProps) {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const toast = useToast();

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Grid>
      
    </Grid>
  );
}

export default CanvasComponent;
