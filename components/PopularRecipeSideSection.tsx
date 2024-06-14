"use client";
import { Recipe } from "@/interfaces";
import { Box, Divider, Heading, Image, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const PopularRecipeSideSection = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/recipes/popular");
        if (res.status == 200) {
          const data = await res.json();
          setRecipes(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(recipes);
  if (loading) {
    return "loading...";
  }
  if (!recipes) {
    return "no found..";
  }
  return (
    <Box
      flex={1}
      display={{ base: "none", lg: "block" }}
      className=" bg-orange-400"
      borderRadius={12}
      px={4}
      pt={6}
    >
      <Heading as="h3" size="lg" mb={3}>
        Popular Recipes
      </Heading>
      <VStack spacing={4}>
        {recipes.map((recipe: Recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
      </VStack>
    </Box>
  );
};

export default PopularRecipeSideSection;
