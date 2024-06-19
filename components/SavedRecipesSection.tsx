// @ts-nocheck
"use client";
import NoRecipesAvailable from "@/components/NoRecipesAvailable";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/interfaces";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface User {
  id: string; // or number, depending on your ID type
  name?: string; // other user properties
  email?: string; // other user properties
}

export interface CustomSession {
  user: User;
}
const SavedRecipesSection = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);

  //loading management
  const [isLoading, setIsLoading] = useState(true);
  const loading = status == "loading";
  const pageLoading = loading && isLoading;
  useEffect(() => {
    const fetchProfileRecipes = async () => {
      if (!session || !session.user) return;
      try {
        const res = await fetch(`/api/saved/${session.user.id}`);
        if (res.status == 200) {
          const data = await res.json();
          setRecipes(data);
        } else {
          toast.error("Failed to fetch recipes.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileRecipes();
  }, [session]);
  if (pageLoading) {
    return (
      <Box
        as="section"
        className="  h-[70vh] w-screen flex justify-center  items-center"
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
          <NoRecipesAvailable isSavedPage={true} />
        </>
      )}
    </>
  );
};

export default SavedRecipesSection;
