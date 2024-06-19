import RecipesSection from "@/components/RecipesSection";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { Suspense } from "react";

const RecipePage = () => {
  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Box textAlign={"center"} my={12}>
        <Heading as={"h1"} size={{ base: "xl", md: "2xl" }}>
          Discover Delicious Recipes
        </Heading>
        <Text
          size={{ base: "lg", md: "xl" }}
          mt={4}
          w={{ base: "auto", md: "70%" }}
          mx={"auto"}
          textAlign={"center"}
        >
          Explore a world of culinary delights with our collection of delicious
          recipes. From comforting classics to innovative new dishes, find the
          perfect recipe to inspire your next meal.
        </Text>
      </Box>
      <Suspense>
        {" "}
        <RecipesSection />
      </Suspense>
    </Box>
  );
};

export default RecipePage;
