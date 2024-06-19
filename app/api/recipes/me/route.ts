import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import { getSessionUser } from "@/utils/getSessionUser";

//GET /api/recipes/me
export const GET = async () => {
  try {
    const sessionUser = await getSessionUser();console.log(sessionUser)
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Authentication is required.", { status: 401 });
    }
    await connectDB();

    const recipes = await Recipe.find({ author: sessionUser.userId });
    if (!recipes) {
      return new Response("Recipes Not Found.", { status: 404 });
    }
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
