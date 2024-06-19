"use client";
import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/interfaces";
import { fetchVeganRecipes } from "@/utils/requests";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

const VeganRecipesSection = () => {
  // const veganRecipes = await fetchVeganRecipes();
  const [veganRecipes, setVeganRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchVeganRecipes = async () => {
      try {
        const res = await fetch(`/api/tags/vegan`);
        if (res.status == 200) {
          const data = await res.json();
          setVeganRecipes(data);
        } else {
          toast.error("Failed to fetch recipes.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVeganRecipes();
  }, []);
  return (
    <Box
      as="section"
      py={12}
      px={4}
      className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
    >
      <VStack spacing={4} mb={8} textAlign="center">
        <Heading as="h2" size="xl">
          Delicious Vegan Recipes
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Discover a variety of mouth-watering vegan recipes that are both
          healthy and satisfying. From hearty mains to delectable desserts, find
          plant-based dishes that will delight your taste buds and nourish your
          body.
        </Text>
      </VStack>
      {loading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {[0, 1, 2].map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {veganRecipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </SimpleGrid>
      )}

      <div className="mt-6 mx-auto w-full flex justify-center">
        {" "}
        <Button
          as={Link}
          href="/tags/vegan"
          size="md"
          colorScheme="orange"
          sx={{ textDecoration: "none" }}
        >
          Explore Vegan Recipes
        </Button>
      </div>
    </Box>
  );
};

export default VeganRecipesSection;
