import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";

//GET /api/recipes/popular
export const GET = async (request: Request) => {
  try {
    await connectDB();
    const recipes = await Recipe.aggregate([{ $sample: { size: 4 } }]);
    if (!recipes) {
      return new Response("Recipes Not Found.", { status: 404 });
    }
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
