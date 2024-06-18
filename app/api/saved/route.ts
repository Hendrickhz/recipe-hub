import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/saved
export const GET = async () => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const user = await User.findById(sessionUser.userId);

    const savedRecipes = await Recipe.find({ _id: { $in: user.saved } });

    return new Response(JSON.stringify(savedRecipes), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
// POST /api/saved
export const POST = async (request: Request) => {
  const { recipeId } = await request.json();
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }
    let isSaved;
    let message;
    const user = await User.findById(sessionUser.userId);
    //check the recipe is in user's saved
    isSaved = user.saved.includes(recipeId);
    if (isSaved) {
      user.saved.pull(recipeId);
      message = "The recipe is removed from the saved list.";
      isSaved = false;
    } else {
      user.saved.push(recipeId);
      message = "The recipe is added to the saved list.";
      isSaved = true;
    }
    await user.save();
    return new Response(JSON.stringify({ isSaved, message }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
