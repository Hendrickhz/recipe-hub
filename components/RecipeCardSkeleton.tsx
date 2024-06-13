import React from "react";
import Skeleton from "react-loading-skeleton";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FaTags } from "react-icons/fa";

const RecipeCardSkeleton = () => (
  <Box
    borderRadius="lg"
    overflow="hidden"
    shadow="md"
    maxW={{ base: "90%", md: "sm" }}
    mx="auto"
    minW="360px"
  >
    <Skeleton height={400} />

    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold">
        <Skeleton width="80%" />
      </Text>

      <Skeleton className="mr-4" inline width="20%" />
      <Skeleton className="mr-4" inline width="20%" />
      <Skeleton inline width="20%" />
    </Box>
  </Box>
);

export default RecipeCardSkeleton;
