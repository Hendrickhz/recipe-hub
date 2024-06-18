"use client";
import NoRecipesAvailable from "@/components/NoRecipesAvailable";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import { Recipe } from "@/interfaces";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const RecipePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/recipes?course=${course || "All"}`);
        if (res.status === 200) {
          const data = await res.json();
          setRecipes(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [course]);

  const handleCourseChange = (course: string) => {
    router.push(`/recipes?course=${course}`);
  };

  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Box textAlign={"center"} my={12}>
        <Heading as={"h1"} size={{ base: "xl", md: "2xl" }}>
          Discover Delicious Recipes
        </Heading>
        <Text
          size={{ base: "lg", md: "xl" }}
          mt={4}
          w={{ base: "auto", md: "70%" }}
          mx={"auto"}
          textAlign={"center"}
        >
          Explore a world of culinary delights with our collection of delicious
          recipes. From comforting classics to innovative new dishes, find the
          perfect recipe to inspire your next meal.
        </Text>
      </Box>

      {/* Buttons for Courses */}
      <Flex justifyContent={"center"}>
        <Flex gap={6} flexWrap={"wrap"} justifyContent={"center"} mb={12}>
          <Button
            colorScheme="orange"
            variant={course === "All" ? "solid" : "outline"}
            onClick={() => handleCourseChange("All")}
          >
            All
          </Button>
          <Button
            colorScheme="orange"
            variant={course === "Breakfast" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Breakfast")}
          >
            Breakfast
          </Button>
          <Button
            colorScheme="orange"
            variant={course === "Lunch" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Lunch")}
          >
            Lunch
          </Button>
          <Button
            colorScheme="orange"
            variant={course === "Dinner" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Dinner")}
          >
            Dinner
          </Button>
        
          <Button
            colorScheme="orange"
            variant={course === "Snack" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Snack")}
          >
            Snack
          </Button>
        </Flex>
      </Flex>

      {/* Recipes Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <NoRecipesAvailable />
          )}
        </>
      )}
    </Box>
  );
};

export default RecipePage;
