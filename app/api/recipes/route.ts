import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import cloudinary from "@/config/cloudinary";
import mongoose from "mongoose";
import { getSessionUser } from "@/utils/getSessionUser";
import { getSecureUrl } from "@/utils/imageUpload";

// interface IRecipeData {
//   title: string | undefined;
//   tags: string[];
//   description: string;
//   servings: number;
//   prepTime: number; // in minutes
//   cookTime: number; // in minutes
//   totalTime: number; // in minutes
//   cuisine: string;
//   course: string;
//   equipment: string[];
//   ingredients: { name: string; quantity: string }[];
//   instructions: { step: number; instruction: string }[];
//   thumbnailUrl: string;
//   detailImageUrl: string;
//   notes: string;
//   author: string;
// }
// GET /api/recipes
export const GET = async (request: Request) => {
  try {
    await connectDB();
    const url = new URL(request.url);
    const recent = url.searchParams.get("recent");
    const course = url.searchParams.get("course");

    const pageParam = url.searchParams.get("page");
    const pageSizeParam = url.searchParams.get("pageSize");
    
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const pageSize = pageSizeParam ? parseInt(pageSizeParam, 10) : 6;
    
    if (isNaN(page) || page <= 0) {
      throw new Error("Invalid page parameter");
    }
    if (isNaN(pageSize) || pageSize <= 0) {
      throw new Error("Invalid pageSize parameter");
    }
    
    const skip = (page - 1) * pageSize;
    let query = {};

    if (course && course !== "All") {
      if (course === "Lunch" || course === "Dinner") {
        query = { course: "Lunch, Dinner" };
      } else {
        query = { course: course };
      }
    }

    const totalRecipes = await Recipe.countDocuments(query);
    let recipes;

    if (recent) {
      recipes = await Recipe.find().sort({ createdAt: -1 }).limit(3);
    } else {
      recipes = await Recipe.find(query).skip(skip).limit(pageSize);
    }

    if (!recipes.length) {
      return new Response("No Recipes Found", { status: 404 });
    }

    const data = { total: totalRecipes, recipes };
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const session = await getSessionUser();
    if (!session || !session.userId) {
      return new Response("Authentication Required.", { status: 401 });
    }
    const userId = session.userId;
    const formData = await request.formData();
    if (!formData) {
      return new Response("Bad Request.", { status: 400 });
    }

    const thumbnailFile = formData.get("thumbnail") as File;
    const detailImageFile = formData.get("detailImage") as File;
    let thumbnailUrl, detailImageUrl;
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailUrl = await getSecureUrl(thumbnailFile, "thumbnail_imgs");
    }

    if (detailImageFile && detailImageFile.size > 0) {
      detailImageUrl = await getSecureUrl(detailImageFile, "detail_imgs");
    }
    const ingredients = JSON.parse(formData.get("ingredients")!.toString());
    const instructions = JSON.parse(formData.get("instructions")!.toString());
    const prepTime = parseInt(formData.get("prepTime")!.toString(), 10);
    const cookTime = parseInt(formData.get("cookTime")!.toString(), 10);
    const totalTime = prepTime + cookTime;

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
      thumbnailUrl,
      detailImageUrl,
      author: userId,
    };

    // const newRecipe = new Recipe(recipeData);
    // await newRecipe.save();

    // Return response immediately after saving the recipe

    // Upload images to Cloudinary in the background
    // (async () => {
    //   const imageUploadPromises = [];
    //   const thumbnail = formData.get("thumbnail") as File;
    //   const detailImage = formData.get("detailImage") as File;

    //   if (thumbnail) {
    //     const thumbnailBuffer = await thumbnail.arrayBuffer();
    //     const thumbnailArray = Array.from(new Uint8Array(thumbnailBuffer));
    //     const thumbnailData = Buffer.from(thumbnailArray);
    //     const thumbnailBase64 = thumbnailData.toString("base64");

    //     const thumbnailResult = cloudinary.uploader.upload(
    //       `data:image/png;base64,${thumbnailBase64}`,
    //       { folder: "thumbnail_imgs" }
    //     );
    //     imageUploadPromises.push(thumbnailResult);
    //   }

    //   if (detailImage) {
    //     const detailImageBuffer = await detailImage.arrayBuffer();
    //     const detailImageArray = Array.from(new Uint8Array(detailImageBuffer));
    //     const detailImageData = Buffer.from(detailImageArray);
    //     const detailImageBase64 = detailImageData.toString("base64");

    //     const detailImageResult = cloudinary.uploader.upload(
    //       `data:image/png;base64,${detailImageBase64}`,
    //       { folder: "detail_imgs" }
    //     );
    //     imageUploadPromises.push(detailImageResult);
    //   }

    //   const [uploadedThumbnail, uploadedDetailImage] = await Promise.all(
    //     imageUploadPromises
    //   );

    //   if (uploadedThumbnail) {
    //     await Recipe.updateOne(
    //       { _id: newRecipe._id },
    //       { $set: { thumbnailUrl: uploadedThumbnail.secure_url } }
    //     );
    //   }

    //   if (uploadedDetailImage) {
    //     await Recipe.updateOne(
    //       { _id: newRecipe._id },
    //       { $set: { detailImageUrl: uploadedDetailImage.secure_url } }
    //     );
    //   }
    // })();
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    const response = new Response(JSON.stringify({ id: newRecipe._id }), {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
