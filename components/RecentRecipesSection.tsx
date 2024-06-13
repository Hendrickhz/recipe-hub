import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import RecipeCard from "./RecipeCard";

const RecentRecipesSection = () => {
  return (
    <Box
      as="section"
      py={12}
      px={4}
      className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
    >
      <VStack spacing={4} mb={8} textAlign="center">
        <Heading as="h2" size="xl">
          Recent Recipes
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Discover the latest delicious recipes added to our collection. These
          recipes are sure to inspire your next meal.
        </Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </SimpleGrid>
      <div className="mt-6 mx-auto w-full flex justify-center">
        {" "}
        <Button
          as={Link}
          href="/recipes/create"
          size="md"
          colorScheme="orange"
          sx={{ textDecoration: "none" }}
        >
          Explore More Recipes
        </Button>
      </div>
    </Box>
  );
};

export default RecentRecipesSection;
