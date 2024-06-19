import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
interface PaginationProp {
  page: number;
  pageSize: number;
  totalItems: number;
  handlePageChange: (s: number) => void;
}
const Pagination = ({
  page,
  pageSize,
  totalItems,
  handlePageChange,
}: PaginationProp) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <Flex justifyContent={"center"} alignItems={"center"} className="my-10">
      <Button
        colorScheme="orange"
        variant={"outline"}
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Text className="mx-2 text-orange-800">
        Page {page} of {totalPages}
      </Text>
      <Button
        colorScheme="orange"
        variant={"outline"}
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
