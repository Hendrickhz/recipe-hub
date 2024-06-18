"use client";
import RecipeEditForm from "@/components/RecipeEditForm";
import { Recipe } from "@/interfaces";
import { Box, Spinner } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecipeEditPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (res.status == 200) {
          const data = await res.json();
          setRecipe(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeData();
  }, [id]);
  console.log(recipe);
  if (loading) {
    return (
      <Box
        as="section"
        className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-[70vh] flex items-center justify-center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="orange.500"
          size="xl"
        />
      </Box>
    );
  }
  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <RecipeEditForm recipe={recipe!} />
    </Box>
  );
};

export default RecipeEditPage;
