"use client";
import { Box, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineArrowSmLeft } from "react-icons/hi";

const BackButton = () => {
  const router = useRouter();
  return (
    <Box className=" w-full  sticky top-[90px]  bg-orange-50  py-2">
      <IconButton
        aria-label="back-arrow"
        icon={<HiOutlineArrowSmLeft size={26} />}
        colorScheme="orange"
        
        // size={'lg'}
        onClick={() => router.back()}
        rounded={"100%"}
        variant={"ghost"}
      />
    </Box>
  );
};

export default BackButton;
