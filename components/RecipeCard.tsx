import { Recipe } from "@/interfaces";
import { Box, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FaTags } from "react-icons/fa";
const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Box
      
      borderRadius="lg"
      overflow="hidden"
      bg="orange.500"
      shadow="md"
      maxW={{ base: "90%", md: "sm" }}
      mx="auto"
      w="360px"
    >
      <Image
        src={recipe.thumbnailUrl}
        alt="Braised lamb stew"
        objectFit="cover"
        w="100%"
        h={{ base: "460px" }}
      />

      <Box p={6} bg="orange.500" color="white">
        <Text fontSize="2xl" fontWeight="bold" fontFamily={'serif'}>
          <Link href={`/recipes/${recipe._id}`}> {recipe.title}</Link>
        </Text>
        <div className=" flex flex-wrap items-center gap-2 mt-3">
          <FaTags />
          {recipe.tags.map((tag, index) => (
            <Text className=" uppercase text-xs" fontFamily={'serif'}  key={index}>{tag}</Text>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default RecipeCard;
