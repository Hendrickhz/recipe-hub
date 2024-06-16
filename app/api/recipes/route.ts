import connectDB from "@/config/database";
import Recipe from "@/models/Recipe";
import cloudinary from "@/config/cloudinary";
import mongoose from "mongoose";
import { getSessionUser } from "@/utils/getSessionUser";

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
    let recipes;
    let query;
    if (course && course !== "All") {
      if (course == "Lunch" || course == "Dinner") {
        query = { course: "Lunch, Dinner" };
      } else {
        query = { course: course };
      }
    }
    if (recent) {
      recipes = await Recipe.find().sort({ createdAt: -1 }).limit(3);
    } else if (query) {
      recipes = await Recipe.find(query);
    } else {
      recipes = await Recipe.find();
    }
    if (!recipes) {
      return new Response("No Recipes Found", { status: 404 });
    }
    return new Response(JSON.stringify(recipes), { status: 200 });
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

    const ingredients = JSON.parse(formData.get("ingredients")!.toString());
    const instructions = JSON.parse(formData.get("instructions")!.toString());
    const prepTime = parseInt(formData.get("prepTime")!.toString(), 10);
    const cookTime = parseInt(formData.get("cookTime")!.toString(), 10);
    const totalTime = prepTime + cookTime;

    const recipeData = {
      title: formData.get("title")!.toString(),
      tags: formData.get("tags")!.toString().split(","),
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
      thumbnailUrl: "/a-1.png",
      detailImageUrl: "/a-1.png",
      author: userId,
    };

    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();

    // Return response immediately after saving the recipe
    const response = new Response(JSON.stringify({ id: newRecipe._id }), {
      status: 201,
    });

    // Upload images to Cloudinary in the background
    (async () => {
      const imageUploadPromises = [];
      const thumbnail = formData.get("thumbnail") as File;
      const detailImage = formData.get("detailImage") as File;

      if (thumbnail) {
        const thumbnailBuffer = await thumbnail.arrayBuffer();
        const thumbnailArray = Array.from(new Uint8Array(thumbnailBuffer));
        const thumbnailData = Buffer.from(thumbnailArray);
        const thumbnailBase64 = thumbnailData.toString("base64");

        const thumbnailResult = cloudinary.uploader.upload(
          `data:image/png;base64,${thumbnailBase64}`,
          { folder: "thumbnail_imgs" }
        );
        imageUploadPromises.push(thumbnailResult);
      }

      if (detailImage) {
        const detailImageBuffer = await detailImage.arrayBuffer();
        const detailImageArray = Array.from(new Uint8Array(detailImageBuffer));
        const detailImageData = Buffer.from(detailImageArray);
        const detailImageBase64 = detailImageData.toString("base64");

        const detailImageResult = cloudinary.uploader.upload(
          `data:image/png;base64,${detailImageBase64}`,
          { folder: "detail_imgs" }
        );
        imageUploadPromises.push(detailImageResult);
      }

      const [uploadedThumbnail, uploadedDetailImage] = await Promise.all(
        imageUploadPromises
      );

      if (uploadedThumbnail) {
        await Recipe.updateOne(
          { _id: newRecipe._id },
          { $set: { thumbnailUrl: uploadedThumbnail.secure_url } }
        );
      }

      if (uploadedDetailImage) {
        await Recipe.updateOne(
          { _id: newRecipe._id },
          { $set: { detailImageUrl: uploadedDetailImage.secure_url } }
        );
      }
    })();

    return response;
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
