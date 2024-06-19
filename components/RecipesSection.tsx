"use client";
import NoRecipesAvailable from "@/components/NoRecipesAvailable";
import Pagination from "@/components/Pagination";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import { Recipe } from "@/interfaces";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
// Import useRouter from 'next/router'

import React, { useEffect, useState } from "react";

const RecipesSection = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const course = searchParams.get("course");
  //pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  console.log(totalItems);
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/recipes?course=${
            course || "All"
          }&page=${page}&pageSize=${pageSize}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setRecipes(data.recipes);
          setTotalItems(data.total);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [course, page, pageSize]);

  const handleCourseChange = (course: string) => {
    setPage(1);
    router.push(`/recipes?course=${course}`);
  };
  return (
    <>
      <Flex justifyContent="center">
        <Flex gap={6} flexWrap="wrap" justifyContent="center" mb={12}>
          <Button
            colorScheme="orange"
            variant={
              course === undefined || course === "All" ? "solid" : "outline"
            }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {[...Array(pageSize)].map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <Box>
              <Text fontSize="larger" fontWeight={700} mb={3}>
                Total Recipes - {totalItems}
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
              </div>
              <Pagination
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                handlePageChange={handlePageChange}
              />
            </Box>
          ) : (
            <NoRecipesAvailable />
          )}
        </>
      )}
    </>
  );
};

export default RecipesSection;
