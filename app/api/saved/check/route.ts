import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";
export const POST = async (request: Request) => {
  const { recipeId } = await request.json();
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }
    const user = await User.findById(sessionUser.userId);

    let isSaved;
    //check recipe is in user's saved
    isSaved = user.saved.includes(recipeId);
    return new Response(JSON.stringify({ isSaved }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong...", { status: 500 });
  }
};
