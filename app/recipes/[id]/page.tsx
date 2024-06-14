"use client";
import { Recipe } from "@/interfaces";
import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Flex,
  List,
  ListItem,
  Divider,
  UnorderedList,
  AbsoluteCenter,
  OrderedList,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTags } from "react-icons/fa";
import { RxLapTimer } from "react-icons/rx";
import { LuChefHat } from "react-icons/lu";
import { PiForkKnife } from "react-icons/pi";
import PopularRecipeSideSection from "@/components/PopularRecipeSideSection";
const RecipeDetailPage = () => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchRecipeDetail = async () => {
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
    fetchRecipeDetail();
  }, [id]);
  console.log(recipe);
  if (loading) {
    return "Loading";
  }
  if (!recipe) {
    return "Not found";
  }
  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Flex direction={{ base: "column", lg: "row" }} p={5}>
        <Box flex={2} pr={{ base: 0, lg: 5 }} mb={{ base: 5, lg: 0 }}>
          <Heading as="h1" mt={5} mb={3}>
            {recipe.title}
          </Heading>
          <Image
            src={recipe.thumbnailUrl}
            alt={recipe.title}
            borderRadius="md"
          />
          <div className=" flex flex-wrap items-center gap-2 my-4">
            <FaTags fontSize={24} />
            {recipe.tags.map((tag, index) => (
              <span className=" font-serif uppercase" key={index}>
                {tag},
              </span>
            ))}
          </div>
          <Text mb={5}>{recipe.description}</Text>
          <Image
            src={recipe.detailImageUrl}
            alt={recipe.title}
            borderRadius="md"
          />
          <Box position="relative" py={5} mt={5}>
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              <RxLapTimer size={24} />
            </AbsoluteCenter>
          </Box>
          {/* {recipe timer} */}
          <Flex justifyContent={"space-between"}>
            {" "}
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text fontWeight="bold" fontFamily={"serif"} fontSize={"larger"}>
                Prep Time
              </Text>
              <Text>{recipe.prepTime} mins</Text>
            </Flex>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text fontWeight="bold" fontFamily={"serif"} fontSize={"larger"}>
                Cook Time
              </Text>
              <Text>
                {Math.floor(recipe.cookTime / 60)} hrs{" "}
                {recipe.cookTime % 60 == 0
                  ? ""
                  : `${recipe.cookTime % 60} mins`}{" "}
              </Text>
            </Flex>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text fontWeight="bold" fontFamily={"serif"} fontSize={"larger"}>
                Total Time
              </Text>
              <Text>
                {Math.floor(recipe.totalTime / 60)} hrs {recipe.totalTime % 60}{" "}
                mins
              </Text>
            </Flex>
          </Flex>
          {/* {recipe timer} */}
          {/* {cuisine, course & servings section} */}
          <Box position="relative" py={5} w={"50%"} display={"inline-block"}>
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              <LuChefHat size={24} />
            </AbsoluteCenter>
          </Box>
          <Box position="relative" py={5} w={"50%"} display={"inline-block"}>
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              <PiForkKnife size={24} />
            </AbsoluteCenter>
          </Box>
          <Flex justifyContent={"space-between"}>
            {" "}
            <Flex justifyContent={"space-between"} flex={2} w={"50%"}>
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Text
                  fontWeight="bold"
                  fontFamily={"serif"}
                  fontSize={"larger"}
                >
                  Course
                </Text>
                <Text>{recipe.course}</Text>
              </Flex>
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Text
                  fontWeight="bold"
                  fontFamily={"serif"}
                  fontSize={"larger"}
                >
                  Cuisine
                </Text>
                <Text>{recipe.cuisine}</Text>
              </Flex>
            </Flex>
            <Flex flexDirection={"column"} alignItems={"center"} w={"50%"}>
              <Text fontWeight="bold" fontFamily={"serif"} fontSize={"larger"}>
                Servings
              </Text>
              <Text>{recipe.servings}</Text>
            </Flex>
          </Flex>
          {/* {cuisine, course & servings section} */}
          {/* Equipment Section */}
          <Box my={5}>
            <Flex alignItems={"center"} gap={5} mb={2}>
              {" "}
              <Heading as="h2" size="md" fontFamily={"serif"}>
                Equipments
              </Heading>{" "}
              <Divider />
            </Flex>
            <UnorderedList spacing={2} mb={5}>
              {recipe.equipment.map((equipment, index) => (
                <ListItem key={index}>{equipment}</ListItem>
              ))}
            </UnorderedList>
          </Box>
          {/* Equipment Section */}
          {/* Ingredients Section */}
          <Box my={5}>
            <Flex alignItems={"center"} gap={5} mb={2}>
              {" "}
              <Heading as="h2" size="md" fontFamily={"serif"}>
                Ingredients
              </Heading>{" "}
              <Divider />
            </Flex>
            <UnorderedList spacing={2} mb={5}>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  {ingredient.name} {ingredient.quantity}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          {/* Ingredients Section */}
          {/* Instructions Section */}

          <Box my={5}>
            <Flex alignItems={"center"} gap={5} mb={2}>
              {" "}
              <Heading as="h2" size="md" fontFamily={"serif"}>
                Instructions
              </Heading>{" "}
              <Divider />
            </Flex>
            <OrderedList spacing={3}>
              {recipe.instructions.map((instruction, index) => (
                <ListItem key={index}>{instruction.instruction}</ListItem>
              ))}
            </OrderedList>
          </Box>
          {/* Instructions Section */}
          {/* Notes Section */}
          <Box my={5}>
            <Flex alignItems={"center"} gap={5} mb={2}>
              {" "}
              <Heading as="h2" size="md" fontFamily={"serif"}>
                Notes
              </Heading>{" "}
              <Divider />
            </Flex>
            <Text>{recipe.notes}</Text>
          </Box>
          {/* Notes Section */}
        </Box>
       
        <PopularRecipeSideSection />
      </Flex>
      {/* ); */}
    </Box>
  );
};

export default RecipeDetailPage;