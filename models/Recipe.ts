import { Schema, models, model, Document } from "mongoose";

interface IIngredient {
  name: String;
  quantity: string;
}
interface IInstruction {
  step: number;
  instruction: string;
}

export interface IRecipe extends Document {
  title: string;
  tags: string[];
  description: string;
  servings: number;
  prepTime: number; //in minutes
  cookTime: number; // in minutes
  totalTime: number;
  cuisine: string;
  course: string;
  equipment: string[];
  ingredients: IIngredient[];
  instructions: IInstruction[];
  notes: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const IngredientSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  quantity: {
    type: String,
    required: [true, "Quantity is required"],
  },
});
const InstructionSchema: Schema = new Schema({
  step: {
    type: Number,
    required: [true, "Step is required"],
  },
  instruction: {
    type: String,
    required: [true, "Instruction is required"],
  },
});

const RecipeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    description: { type: String, required: true },
    servings: { type: Number, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    totalTime: { type: Number, required: true },
    cuisine: { type: Number, required: true },
    course: { type: String, required: true },
    equipment: { type: [String], required: true },
    ingredients: { type: [IngredientSchema], required: true },
    instructions: { type: [InstructionSchema], required: true },
    notes: { type: String, required: true },
    thumbnailUrl: { type: String, required: true }, // URL for thumbnail image
    detailImageUrl: { type: String, required: true }, //
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Recipe = models.Recipe || model<IRecipe>("Recipe", RecipeSchema);
export default Recipe;
