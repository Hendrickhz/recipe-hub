import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box
      as="section"
      bgImage="linear-gradient(to-r, rgba(255, 165, 0, 0.2), rgba(255, 165, 0, 0.4)), url('/hero-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      py={48}
      px={4}
      textAlign="center"
    >
      <Box p={6} borderRadius="md" display="inline-block">
        <Heading as="h1" size="2xl" color="white" mb={4}>
          Welcome to RecipeHub
        </Heading>
        <Text fontSize="xl" color="white" mb={4}>
          Discover and share the best recipes from around the world.
        </Text>

        <Button
          as={Link}
          href="/recipes/create"
          size="lg"
          colorScheme="orange"
          sx={{ textDecoration: "none" }}
        >
          Share Your Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
