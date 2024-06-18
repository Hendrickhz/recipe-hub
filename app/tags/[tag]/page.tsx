import NoRecipesAvailable from "@/components/NoRecipesAvailable";
import TagRecipeCard from "@/components/TagRecipeCard";
import { fetchRecipesByTag } from "@/utils/requests";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
interface ITagRecipe {
  title: string;
  _id: string;
  description: string;
  thumbnailUrl: string;
}
const TagPage = async ({ params }: { params: { tag: string } }) => {
  const { tag } = params;
  const recipes: ITagRecipe[] = await fetchRecipesByTag(tag);
  const decodedTag: string = decodeURIComponent(tag);
  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      <Heading mb={4}>Tag: {decodedTag}</Heading>
      {recipes.length > 0 ? (
        <>
          {recipes.map((recipe) => (
            <TagRecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </>
      ) : (
        <NoRecipesAvailable />
      )}
    </Box>
  );
};

export default TagPage;
