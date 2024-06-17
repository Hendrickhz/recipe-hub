"use client";
import NoRecipesAvailable from "@/components/NoRecipesAvailable";
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
import React, { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const LoggedInUserProfilePage = () => {
  const { data: session, status } = useSession();
  const [recipes, setRecipes] = useState([]);
  //getting user data
  const profileImage = session?.user?.image!;
  const profileName = session?.user?.name!;
  const profileEmail = session?.user?.email!;
  //loading management
  const [isLoading, setIsLoading] = useState(true);
  const loading = status == "loading";
  const pageLoading = loading && isLoading;
  //remove the deleted recipe from the state
  const removeRecipe = (id: string) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe: Recipe) => recipe._id !== id)
    );
  };
  useEffect(() => {
    const fetchProfileRecipes = async () => {
      if (!session) return;
      try {
        const res = await fetch(`/api/recipes/me`);
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
      {/* User Information */}

      <Flex align="center" p={4} maxW="md">
        <Image
          boxSize="100px"
          rounded="full"
          alt={`${profileName}'s image`}
          src={profileImage}
          mr={4}
        />
        <Box>
          <Text fontSize="2xl" fontWeight={700} color="orange.600">
            {profileName}
          </Text>
          <Text fontSize="lg" color="orange.600">
            {profileEmail}
          </Text>
        </Box>
      </Flex>

      {/* User Information */}
      <Divider my={6} />
      {/* recipes section  */}
      <Heading as={"h2"} fontFamily={"serif"}>
        Shared Recipes
      </Heading>
      <>
        {recipes.length > 0 ? (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  my-4  gap-6">
            {" "}
            {recipes.map((recipe: Recipe) => (
              <ProfileRecipeCard
                key={recipe._id}
                recipe={recipe}
                removeRecipe={removeRecipe}
              />
            ))}
          </Box>
        ) : (
          <>
            <NoRecipesAvailable />
          </>
        )}
      </>
      {/* recipes section  */}
    </Box>
  );
};

export default LoggedInUserProfilePage;

interface IRecipeProps {
  _id: string;
  title: string;
  thumbnailUrl: string;
}
const ProfileRecipeCard = ({
  recipe,
  removeRecipe,
}: {
  recipe: IRecipeProps;
  removeRecipe: (id: string) => void;
}) => {
  //delete modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
      if (res.status == 200) {
        toast.success("Deleted the recipe successfully.");
        removeRecipe(id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the recipe.");
    }
    onClose();
  };

  return (
    <>
      <Box
        key={recipe._id}
        borderRadius="lg"
        overflow="hidden"
        bg="orange.500"
        shadow="md"
        maxW={{ base: "90%", md: "sm" }}
        mx="auto"
        w="360px"
        mb={6}
        position="relative"
      >
        <Image
          src={recipe.thumbnailUrl}
          alt={recipe.title}
          objectFit="cover"
          w="100%"
          h={{ base: "460px" }}
        />

        <Box p={6} bg="orange.500" color="white">
          <Text fontSize="2xl" fontWeight="bold" fontFamily="serif">
            <Link href={`/recipes/${recipe._id}`}>{recipe.title}</Link>
          </Text>
        </Box>

        <Flex
          justifyContent="flex-end"
          p={2}
          position="absolute"
          top={0}
          right={0}
        >
          <IconButton
            aria-label="editButton"
            icon={<FaEdit />}
            // onClick={() => onEdit(recipe._id)}
            colorScheme="blue"
            size="sm"
            mr={2}
          />
          <IconButton
            aria-label="deleteButton"
            icon={<FaTrash />}
            onClick={() => onOpen()}
            colorScheme="red"
            size="sm"
          />
        </Flex>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Recipe
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(recipe._id.toString())}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
