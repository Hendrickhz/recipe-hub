
import { Recipe } from "@/interfaces";
import { Box, Heading,  VStack } from "@chakra-ui/react";
import RecipeCard from "./RecipeCard";
import { fetchPopularRecipes } from "@/utils/requests";

const PopularRecipeSideSection = async() => {
  // const [recipes, setRecipes] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/api/recipes/popular");
  //       if (res.status == 200) {
  //         const data = await res.json();
  //         setRecipes(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // console.log(recipes);
  // if (loading) {
  //   return "loading...";
  // }
  // if (!recipes) {
  //   return "no found..";
  // }
  const recipes= await fetchPopularRecipes()
  return (
    <Box
      flex={1}
      display={{ base: "none", lg: "block" }}
      className=" bg-orange-400"
      borderRadius={8}
      px={5}
      py={5}

    >
      <Heading as="h3" textColor={'white'} mb={3} fontFamily={'serif'}>
        Popular Recipes
      </Heading>
      <VStack spacing={5}>
        {recipes.map((recipe: Recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
      </VStack>
    </Box>
  );
};

export default PopularRecipeSideSection;
