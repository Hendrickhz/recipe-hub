import SavedRecipesSection from "@/components/SavedRecipesSection";
import { Box, Heading } from "@chakra-ui/react";

const SavedPage = () => {
  return (
    <Box as="section" className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-6">
      {/* recipes section  */}
      <Heading as={"h2"} fontFamily={"serif"}>
        Saved Recipes
      </Heading>
      <SavedRecipesSection />
    </Box>
  );
};

export default SavedPage;
