import { Recipe } from "@/interfaces";
import { fetchUserAndRecipesData } from "@/utils/requests";
import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import NoRecipesAvailable from "@/components/NoRecipesAvailable";
import React from "react";
import RecipeCard from "@/components/RecipeCard";
interface UserAndRecipeData {
  user: { _id: string; username: string; email: string; image: string };
  recipes: Recipe[];
}

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { user, recipes }:UserAndRecipeData = await fetchUserAndRecipesData(params.id);

  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      {/* User Information */}

      <Flex align="center" p={4} maxW="md">
        <Image
          boxSize="100px"
          rounded="full"
          alt={`${user.username}'s image`}
          src={user.image}
          mr={4}
        />
        <Box>
          <Text fontSize="2xl" fontWeight={700} color="orange.600">
            {user.username}
          </Text>
          <Text fontSize="lg" color="orange.600">
            {user.email}
          </Text>
        </Box>
      </Flex>

      {/* User Information */}
      <Divider my={6} />
      {/* recipes section  */}
      <Heading as={"h2"} fontFamily={"serif"}>
        Shared Recipes
      </Heading>
      <>
        {recipes.length > 0 ? (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  my-4  gap-6">
            {" "}
            {recipes.map((recipe: Recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </Box>
        ) : (
          <>
            <NoRecipesAvailable isLoggedInUserProfilePage={true} />
          </>
        )}
      </>
      {/* recipes section  */}
    </Box>
  );
};

export default UserPage;
