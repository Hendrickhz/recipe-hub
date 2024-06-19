import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";

export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const userId = new mongoose.Types.ObjectId(params.userId);
    // const sessionUser = await getSessionUser();
    // await connectDB();
    // console.log("Session User:", sessionUser);
    // if (!sessionUser || !sessionUser.userId) {
    //   return new Response("User Id is required", { status: 401 });
    // }

    const user = await User.findById(userId);

    const savedRecipes = await Recipe.find({ _id: { $in: user.saved } });

    return new Response(JSON.stringify(savedRecipes), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
