import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";

// GET /api/recipes
export const GET = async () => {
  try {
    await connectDB();
    const recipes = await Recipe.find();
    if (!recipes) {
      return new Response("No Recipes Found", { status: 404 });
    }
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
