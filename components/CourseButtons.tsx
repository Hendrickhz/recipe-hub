"use client";
import { Box, Button, Flex, Heading, Icon, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  MdOutlineFreeBreakfast,
  MdOutlineLunchDining,
  MdOutlineDinnerDining,
  MdOutlineCookie,
} from "react-icons/md";
const CourseButtons = () => {
  const router = useRouter();

  const handleCourseNavigation = (course: string) => {
    router.push(`/recipes?course=${course}`);
  };

  return (
    <Box className=" bg-orange-100 py-12">
      <Box
        as="section"
        textAlign={"center"}
        className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"
      >
        <Heading
          
          as={"h2"}
          size={{ base: "lg", md: "xl" }}
   className=" mb-4"
        >
          Explore Recipes by Course
        </Heading>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={4}
          w="full"
        >
          <Button
            colorScheme="orange"
            onClick={() => handleCourseNavigation("Breakfast")}
            w="full"
            size={"xl"}
            py={6}
            className=" uppercase"
            fontFamily={"serif"}
            rightIcon={<Icon as={MdOutlineFreeBreakfast} />}
          >
            Breakfast
          </Button>

          <Button
            colorScheme="orange"
            onClick={() => handleCourseNavigation("Lunch")}
            w="full"
            size={"xl"}
            py={6}
            className=" uppercase"
            fontFamily={"serif"}
            rightIcon={<Icon as={MdOutlineLunchDining} />}
          >
            Lunch
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => handleCourseNavigation("Dinner")}
            w="full"
            size={"xl"}
            py={6}
            className=" uppercase"
            fontFamily={"serif"}
            rightIcon={<Icon as={MdOutlineDinnerDining} />}
          >
            Dinner
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => handleCourseNavigation("Snack")}
            w="full"
            size={"xl"}
            py={6}
            className=" uppercase"
            fontFamily={"serif"}
            rightIcon={<Icon as={MdOutlineCookie} />}
          >
            Snack
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default CourseButtons;
