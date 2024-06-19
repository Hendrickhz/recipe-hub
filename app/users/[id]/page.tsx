import { Recipe } from "@/interfaces";
import { fetchUserAndRecipesData } from "@/utils/requests";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NoRecipesAvailable from "@/components/NoRecipesAvailable";
import React from "react";
import RecipeCard from "@/components/RecipeCard";
import Image from "next/image";
interface UserAndRecipeData {
  user: { _id: string; username: string; email: string; image: string };
  recipes: Recipe[];
}

const UserPage = async ({ params }: { params: { id: string } }) => {
  const { user, recipes }: UserAndRecipeData = await fetchUserAndRecipesData(
    params.id
  );

  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      {/* User Information */}

      <Flex align="center" p={4} maxW="md">
        <Box className="   overflow-hidden rounded-full mr-4 ">
          <Image
            width={100}
            objectFit="cover"
            height={100}
            alt={`${user.username}'s image`}
            src={user.image}
            className="  rounded-full"
          />
        </Box>
        <Box>
          <Text fontSize="2xl" fontWeight={700} color="orange.600">
            {user.username}
          </Text>
          <Link href={`mailto:${user.email}`} fontSize="lg" color="orange.600">
            {user.email}
          </Link>
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
