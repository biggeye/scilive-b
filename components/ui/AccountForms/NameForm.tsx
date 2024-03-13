'use client';
import React, { useState } from 'react';
import { Box, Flex, Text, Input, useToast } from '@chakra-ui/react';
import Button from '@/components/ui/SaasButton';
import Card from '@/components/ui/SaasCard';
import { updateName } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
export default function NameForm({ userName, userEmail }: { userName: string, userEmail: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Check if the new name is the same as the old name
    if (e.currentTarget.fullName.value === userName) {
      setIsSubmitting(false);
      return;
    }
    await handleRequest(e, updateName, router);
    setIsSubmitting(false);
  };

  const onEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (e.currentTarget.newEmail.value === userEmail) {
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
    // await handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  return (
    <Card
      title="Your Name"
      description="Please enter your full name, or a display name you are comfortable with."
      footer={
        <Flex direction="column" align="start" justify="between" className="sm:flex-row sm:items-center">
          <Text className="pb-4 sm:pb-0">64 characters maximum</Text>
          <Button
            variant="slim"
            type="submit"
            form="nameForm"
          >
            Update Name
          </Button>
        </Flex>
      }
    >
      <Box mt={2} mb={1}>
        <form id="nameForm" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="fullName"
            defaultValue={userName}
            placeholder="Your name"
            maxLength={64}
          />
        </form>
        <Flex direction="column" align="start" justify="between" className="sm:flex-row sm:items-center">
          <Text>Please enter the email address you want to use to login.</Text>
          <form id="emailForm" onSubmit={onEmailSubmit}>
            <Input
              type="email"
              name="newEmail"
              defaultValue={userEmail}
              placeholder="Your email"
              maxLength={64}
              mt={8}
              mb={4}
            />
            <Button
              type="submit"
              form="emailForm"
                 mt={4}
            >
              Update Email
            </Button>
          </form>
          <Text mt={4}>We will email you to verify the change.</Text>
        </Flex>
      </Box>
    </Card>
  );
}
