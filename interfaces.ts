export interface Recipe {
    _id: string; // Assuming each recipe has a unique ID
    title: string;
    tags: string[];
    description: string;
    servings: number;
    prepTime: number; // in minutes
    cookTime: number; // in minutes
    totalTime: number; // in minutes
    cuisine: string;
    course: string;
    equipment: string[];
    ingredients: { name: string; quantity: string }[];
    instructions: { step: number; instruction: string }[];
    thumbnailUrl: string;
    detailImageUrl: string;
    notes: string;
    author: string;
  }