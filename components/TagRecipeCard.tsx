import { Box, Heading, Image, Link, Text } from "@chakra-ui/react";
import React from "react";
interface IRecipe {
  _id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
}
const TagRecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  return (
    <Box mb={4}>
      <Heading fontFamily={"serif"} as={"h3"}>
        <Link href={`/recipes/${recipe._id}`}>{recipe.title}</Link>
      </Heading>
      <Link href={`/recipes/${recipe._id}`}>
        <Image
          w={"full"}
          maxH={{ base: "300px", md: "500px" }}
          alt={recipe.title}
          src={recipe.thumbnailUrl}
          objectFit={"cover"}
        />
      </Link>
      <Text>{recipe.description.slice(0, 340)}...</Text>
    </Box>
  );
};

export default TagRecipeCard;
