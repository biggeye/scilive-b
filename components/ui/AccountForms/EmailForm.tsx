'use client'
import { Button, Card, Flex, Input, Box, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmailForm({ userEmail }: { userEmail: string | undefined; }) {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    if (data.newEmail === userEmail) {
      toast({
        title: "Email update",
        description: "The new email is the same as the old email",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }
    // updateEmail function needs to be defined
    // handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  return (
    <Card
    title="Your Name"
    description="Please enter your full name, or a display name you are comfortable with."
    >
      <Flex direction="column" align="start" justify="between" className="sm:flex-row sm:items-center">
      <Text>Please enter the email address you want to use to login.</Text>
      <form id="emailForm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="newEmail"
          
          value={userEmail ?? ''}
          placeholder="Your email"
          maxLength={64}
          mt={8}
          mb={4}
        />
        <Button
          variant="outline"
          type="submit"
          form="emailForm"
          isLoading={isSubmitting}
          mt={4}
        >
          Update Email
        </Button>
      </form>
      <Text mt={4}>We will email you to verify the change.</Text>
      </Flex>
    </Card>
  );
}
