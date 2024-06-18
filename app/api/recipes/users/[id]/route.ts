import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (sessionUser?.userId?.toString() == params.id.toString()) {
      return Response.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/profile`);
    }
    const userId = new mongoose.Types.ObjectId(params.id);
    const user = await User.findById(userId);
    if (!user) {
      return new Response("Invalid User", { status: 404 });
    }
    const userRecipes = await Recipe.find({ author: userId });
    const data = {
      user,
      recipes: userRecipes,
    };
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
