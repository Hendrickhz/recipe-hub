"use client";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import { Recipe } from "@/interfaces";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("");
  console.log(recipes);
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/recipes?course=${selectedCourse}`);
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
    fetchRecipes();
  }, [selectedCourse]);
  const handleCourseChange = (course: string) => {
    setSelectedCourse(course);
  };
  return (
    <Box
      as="section"
      className=" 
 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
    >
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
      {/* Buttons */}
      <Flex justifyContent={"center"}>
        <Flex gap={6} flexWrap={"wrap"} justifyContent={"center"} mb={12}>
          <Button
            colorScheme="orange"
            variant={
              selectedCourse == "All" || selectedCourse == ""
                ? "solid"
                : "outline"
            }
            onClick={() => handleCourseChange("All")}
          >
            All
          </Button>
          <Button
            colorScheme="orange"
            variant={selectedCourse == "Breakfast" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Breakfast")}
          >
            Breakfast
          </Button>
          <Button
            colorScheme="orange"
            variant={selectedCourse == "Lunch" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Lunch")}
          >
            Lunch
          </Button>
          <Button
            colorScheme="orange"
            variant={selectedCourse == "Dinner" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Dinner")}
          >
            Dinner
          </Button>
          <Button
            colorScheme="orange"
            variant={selectedCourse == "Dessert" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Dessert")}
          >
            Dessert
          </Button>
          <Button
            colorScheme="orange"
            variant={selectedCourse == "Snack" ? "solid" : "outline"}
            onClick={() => handleCourseChange("Snack")}
          >
            Snack
          </Button>
        </Flex>
      </Flex>
      {/* Buttons */}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-6">
          {[0, 1, 2].map((i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-6">
              {recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <Flex
              textAlign={"center"}
              direction={"column"}
              justifyContent={"center"}
              w={"full"}
            >
              <Box>
                <Image alt="no-found" src="/folder.png" w={32} mx={"auto"} />
              </Box>
              <Heading as={"h6"}>No Recipe Available</Heading>
              <Text>Currently, there are no recipes available.</Text>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default RecipePage;
