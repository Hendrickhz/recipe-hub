import { Recipe } from "@/interfaces";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaTags } from "react-icons/fa";
const RecipeCard = ({ recipe }:{recipe:Recipe}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
 bg="orange.500"
      shadow="md"
      maxW={{ base: "90%", md: "sm" }}
      mx="auto"
      minW="360px"
      
    >
      <Image
        src={recipe.thumbnailUrl}
        alt="Braised lamb stew"
        objectFit="cover"
        w="100%"
        h={{ base: "460px" }}
      />

      <Box p={6} bg="orange.500" color="white">
        <Text fontSize="2xl" fontWeight="bold">
          {recipe.title}
        </Text>
        <div className=" flex flex-wrap items-center gap-2">
          <FaTags />
          {recipe.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default RecipeCard;