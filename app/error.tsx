"use client";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <Box
      as="section"
      className=" flex  justify-center items-center w-full h-[80vh]"
    >
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          404 - Page Not Found
        </Heading>
        <Text fontSize="xl" mb={8}>
          Oops! The page you&apos;re looking for does not exist.
        </Text>
        <Button colorScheme="orange" size="lg" as={Link} href="/">
          Go back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
