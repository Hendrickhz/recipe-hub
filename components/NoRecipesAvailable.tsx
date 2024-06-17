import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const NoRecipesAvailable = () => {
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
    </Flex>
  );
};

export default NoRecipesAvailable;
