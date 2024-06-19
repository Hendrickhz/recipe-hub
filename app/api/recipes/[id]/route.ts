import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { getSecureUrl } from "@/utils/imageUpload";
import mongoose from "mongoose";
function extractPublicId(secureUrl: string, folderName: string) {
  const folderPosition = secureUrl.indexOf(folderName);

  // Extract the part of the URL that contains the public ID and the file name
  const urlPart = secureUrl.substring(folderPosition);

  // Remove the file extension from the extracted part
  const publicId = urlPart.substring(0, urlPart.lastIndexOf("."));

  return publicId;
}
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
    const recipe = await Recipe.findById(id).populate("author", "username");
    if (!recipe) {
      return new Response("Recipe Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    console.error(error);
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

    const thumbnailUrlPublicId = `thumbnail_imgs/${
      recipe.thumbnailUrl.split("/").pop().split(".")[0]
    }`;
    const detailImageUrlPublicId = `detail_imgs/${
      recipe.detailImageUrl.split("/").pop().split(".")[0]
    }`;
    await cloudinary.uploader.destroy(thumbnailUrlPublicId);
    await cloudinary.uploader.destroy(detailImageUrlPublicId);

    // Remove recipe ID from all users' saved lists
    await User.updateMany({ saved: _id }, { $pull: { saved: _id } });
    await recipe.deleteOne(_id);
    return new Response("Recipe is deleted successfully.", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
// await deleteImageFromCloudinary(thumbnailUrlPublicId);
// await deleteImageFromCloudinary(detailImageUrlPublicId);

// async function deleteImageFromCloudinary(publicId: string) {
//   await new Promise<void>((resolve, reject) => {
//     cloudinary.uploader.destroy(publicId);
//   });
// }

//PUT /api/recipes/[id]
export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Authentication Failed.", { status: 401 });
    }
    const { userId } = sessionUser;
    await connectDB();
    const { id } = params;
    const _id = new mongoose.Types.ObjectId(id);
    const existingRecipe = await Recipe.findById(_id);
    if (!existingRecipe) {
      return new Response("Recipe Not Found.", { status: 404 });
    }
    if (existingRecipe.author.toString() !== userId.toString()) {
      return new Response("Unauthorized", {
        status: 403,
      });
    }
    const formData = await request.formData();
    if (!formData) {
      return new Response("Bad Request.", { status: 400 });
    }

    const ingredients = JSON.parse(formData.get("ingredients")!.toString());
    const instructions = JSON.parse(formData.get("instructions")!.toString());
    const prepTime = parseInt(formData.get("prepTime")!.toString(), 10);
    const cookTime = parseInt(formData.get("cookTime")!.toString(), 10);
    const totalTime = prepTime + cookTime;

    // Check for new images and upload if present
    // let currentThumbnailUrl = existingRecipe.thumbnailUrl;
    // let currentDetailImageUrl = existingRecipe.detailImageUrl;

    // const newThumbnailFile = formData.get("thumbnail") as File;
    // const newDetailImageFile = formData.get("detailImage") as File;

    // let newThumbnailUrl = currentThumbnailUrl;
    // let newDetailImageUrl = currentDetailImageUrl;

    // if (newThumbnailFile && newThumbnailFile.size > 0) {
    //   newThumbnailUrl = await getSecureUrl(newThumbnailFile, "thumbnail_imgs");
    // }

    // if (newDetailImageFile && newDetailImageFile.size > 0) {
    //   newDetailImageUrl = await getSecureUrl(newDetailImageFile, "detail_imgs");
    // }
    // Check for new images and upload if present
    let currentThumbnailUrl = existingRecipe.thumbnailUrl;
    let currentDetailImageUrl = existingRecipe.detailImageUrl;

    const newThumbnailFile = formData.get("thumbnail") as File;
    const newDetailImageFile = formData.get("detailImage") as File;

    let newThumbnailUrl = currentThumbnailUrl;
    let newDetailImageUrl = currentDetailImageUrl;

    // Delete old thumbnail image if a new one is provided
    if (newThumbnailFile && newThumbnailFile.size > 0) {
      newThumbnailUrl = await getSecureUrl(newThumbnailFile, "thumbnail_imgs");
      // if (currentThumbnailUrl) {
      //   const oldThumbnailPublicId = extractPublicId(currentThumbnailUrl, "thumbnail_imgs");
      //   await deleteImageFromCloudinary(oldThumbnailPublicId);
      // }
    }

    // Delete old detail image if a new one is provided
    if (newDetailImageFile && newDetailImageFile.size > 0) {
      newDetailImageUrl = await getSecureUrl(newDetailImageFile, "detail_imgs");
      // if (currentDetailImageUrl) {
      //   const oldDetailPublicId = extractPublicId(currentDetailImageUrl, "detail_imgs");
      //   await deleteImageFromCloudinary(oldDetailPublicId);
      // }
    }

    const recipeData = {
      title: formData.get("title")!.toString(),
      tags: formData
        .get("tags")!
        .toString()
        .split(", ")
        .map((tag) => tag.trim()),
      description: formData.get("description")!.toString(),
      servings: parseInt(formData.get("servings")!.toString(), 10),
      prepTime,
      cookTime,
      totalTime,
      cuisine: formData.get("cuisine")!.toString(),
      course: formData.get("course")!.toString(),
      equipment: formData.get("equipment")!.toString(),
      ingredients,
      instructions,
      notes: formData.get("notes")?.toString() || "",
      thumbnailUrl: newThumbnailUrl,
      detailImageUrl: newDetailImageUrl,
      author: userId,
    };

    // Update the existing recipe with new data
    Object.assign(existingRecipe, recipeData);
    await existingRecipe.save();

    return new Response(JSON.stringify(existingRecipe), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
