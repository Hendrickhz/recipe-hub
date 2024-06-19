"use client";
import NoRecipesAvailable from "@/components/NoRecipesAvailable";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/interfaces";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const SavedPage = () => {
  const { data: session, status } = useSession();
  const [recipes, setRecipes] = useState([]);

  //loading management
  const [isLoading, setIsLoading] = useState(true);
  const loading = status == "loading";
  const pageLoading = loading && isLoading;
 
  useEffect(() => {
    const fetchProfileRecipes = async () => {
      if (!session) return;
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
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
     
      {/* recipes section  */}
      <Heading as={"h2"} fontFamily={"serif"}>
        Saved Recipes
      </Heading>
      <>
        {recipes.length > 0 ? (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  my-4  gap-6">
            {" "}
            {recipes.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
              />
            ))}
          </Box>
        ) : (
          <>
            <NoRecipesAvailable isSavedPage={true} />
          </>
        )}
      </>
      {/* recipes section  */}
    </Box>
  );
};

export default SavedPage;

interface IRecipeProps {
  _id: string;
  title: string;
  thumbnailUrl: string;
}

