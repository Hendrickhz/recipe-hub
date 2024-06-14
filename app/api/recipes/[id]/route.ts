import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";

//GET /api/recipes/[id]
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return new Response("Recipe Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
