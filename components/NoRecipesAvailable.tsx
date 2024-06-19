import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

const NoRecipesAvailable = ({
  isLoggedInUserProfilePage = false,
  isSavedPage = false,
}) => {
  return (
    <Flex
      textAlign={"center"}
      direction={"column"}
      justifyContent={"center"}
      w={"full"}
      gap={3}
    >
      <Box>
        <Image alt="no-found" src="/folder.png" w={32} mx={"auto"} />
      </Box>
      <Text fontSize={"large"} fontWeight={600}>
        No Recipe Available
      </Text>
      <Text>Currently, there are no recipes available.</Text>
      {isLoggedInUserProfilePage && (
        <Box>
          {" "}
          <Button as={Link} href="/recipes/create" colorScheme="orange">
            Share A Recipe
          </Button>
        </Box>
      )}
      {isSavedPage && (
        <Box>
          {" "}
          <Button as={Link} href="/recipes" colorScheme="orange">
            Explore Recipes
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default NoRecipesAvailable;
