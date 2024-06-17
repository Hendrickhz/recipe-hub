import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import { getSessionUser } from "@/utils/getSessionUser";
import mongoose from "mongoose";

interface CloudinaryDeleteResult {
  result: string; // Expected to be "ok" if successful
}

interface CloudinaryDeleteError {
  message: string;
  http_code: number;
}
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
//DELETE /api/recipes/[id]
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const { id } = params;
    const _id = new mongoose.Types.ObjectId(id);
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Authentication is required.", { status: 401 });
    }
    const recipe = await Recipe.findById(_id);
    if (recipe.author.toString() !== sessionUser.userId.toString()) {
      return new Response("Unauthorized", { status: 403 });
    }

 
     // Delete images from Cloudinary
     const imageUrls = [recipe.thumbnailUrl, recipe.detailImageUrl];
     for (const imageUrl of imageUrls) {
       if (!imageUrl) continue;
       const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public_id from URL
       // Debug: Log public ID
       console.log("Deleting image with publicId:", publicId);
 
       await new Promise<void>((resolve, reject) => {
         cloudinary.uploader.destroy(publicId, (error: CloudinaryDeleteError, result: CloudinaryDeleteResult) => {
           if (error) {
             console.error(`Failed to delete image ${publicId} from Cloudinary:`, error);
             reject(new Response("Failed to delete image from Cloudinary.", { status: 500 }));
           } else {
             // Debug: Log Cloudinary response
             console.log(`Deleted image ${publicId} from Cloudinary:`, result);
             resolve();
           }
         });
       });
     }
    await recipe.deleteOne(_id);
    return new Response("Recipe is deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
