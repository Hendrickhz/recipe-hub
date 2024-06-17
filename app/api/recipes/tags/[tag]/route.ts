//GET /api/recipes/tags/[tag]

import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";

export const GET = async (
  request: Request,
  { params }: { params: { tag: string } }
) => {
  try {
    await connectDB();

    const { tag } = params;

    if (!tag) {
      return new Response("Tag is required", { status: 400 });
    }
    const decodedTag = decodeURIComponent(tag);

    const recipes = await Recipe.find({ tags: {$in: [decodedTag]} }, 'id title thumbnailUrl description');
    if (!recipes) {
      return new Response("Recipes Not Found", { status: 404 });
    }
   
    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
