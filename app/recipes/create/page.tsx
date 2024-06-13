import RecipeCreateForm from "@/components/RecipeCreateForm";
import { Box } from "@chakra-ui/react";
import React from "react";

const RecipeCreatePage = () => {
  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <RecipeCreateForm/>
    </Box>
  );
};

export default RecipeCreatePage;
