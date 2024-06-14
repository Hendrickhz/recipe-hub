"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  IconButton,
  Flex,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";

// Define the form data types
interface Ingredient {
  name: string;
  quantity: string;
}

interface Instruction {
  step: number;
  instruction: string;
}

interface RecipeFormData {
  title: string;
  tags: string;
  description: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  cuisine: string;
  course: string;
  equipment: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  thumbnail?: FileList; // Make optional
  detailImage?: FileList; // Make optional
  notes?: string;
}

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  tags: Yup.string().required("Tag is required"),
  description: Yup.string().required("Description is required"),
  servings: Yup.number().min(1).required("Servings are required"),
  prepTime: Yup.number().min(1).required("Preparation time is required"),
  cookTime: Yup.number().min(1).required("Cooking time is required"),
  cuisine: Yup.string().required("Cuisine is required"),
  course: Yup.string().required("Course is required"),
  equipment: Yup.string().required("Equipment is required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Ingredient name is required"),
        quantity: Yup.string().required("Quantity is required"),
      })
    )
    .min(1, "At least one ingredient is required"),
  instructions: Yup.array()
    .of(
      Yup.object().shape({
        step: Yup.number().required(),
        instruction: Yup.string().required("Instruction is required"),
      })
    )
    .min(1, "At least one instruction is required"),
  thumbnail: Yup.mixed().required("Thumbnail image is required"),
  detailImage: Yup.mixed().required("Detail image is required"),
  notes: Yup.string().notRequired(),
});

const RecipeCreateForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      tags: "",
      description: "",
      servings: 1,
      prepTime: 1,
      cookTime: 1,
      cuisine: "",
      course: "",
      equipment: "",
      ingredients: [{ name: "", quantity: "" }],
      instructions: [{ step: 1, instruction: "" }],
      thumbnail: undefined,
      detailImage: undefined,
      notes: "",
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const onSubmit = async (data: RecipeFormData) => {
    // handle form submission
    setIsSubmitting(true);
    const formData = new FormData();

    // Append non-file fields
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("description", data.description);
    formData.append("servings", data.servings.toString());
    formData.append("prepTime", data.prepTime.toString());
    formData.append("cookTime", data.cookTime.toString());
    formData.append("cuisine", data.cuisine);
    formData.append("course", data.course);
    formData.append("equipment", data.equipment);

    // Append JSON stringified ingredients and instructions
    formData.append("ingredients", JSON.stringify(data.ingredients));
    formData.append("instructions", JSON.stringify(data.instructions));

    // Append file fields (thumbnail and detailImage)
    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.detailImage && data.detailImage.length > 0) {
      formData.append("detailImage", data.detailImage[0]);
    }

    // Append optional fields
    if (data.notes) {
      formData.append("notes", data.notes);
    }
    const loadingToastId = toast.loading("Creating a recipe...");
    try {
      console.log(formData);

      const res = await fetch("/api/recipes", {
        method: "POST",
        body: formData,
      });
      // Example: Send the form data to an API endpoint
      if (res.status == 200 || res.status == 201) {
        toast.update(loadingToastId, {
          render: "The recipe is created successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(loadingToastId, {
          render: "Failed to create the recipe",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: "Failed to create the recipe",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={5} shadow="md" borderRadius={"8px"} my={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input placeholder="Recipe Title" {...field} />
              )}
            />
            {errors.title && (
              <FormErrorMessage>{errors.title.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.tags}>
            <FormLabel>Tags</FormLabel>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Input placeholder="Tags (comma separated)" {...field} />
              )}
            />
            {errors.tags && (
              <FormErrorMessage>{errors.tags.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea placeholder="Recipe Description" {...field} />
              )}
            />
            {errors.description && (
              <FormErrorMessage>{errors.description.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.servings}>
            <FormLabel>Servings</FormLabel>
            <Controller
              name="servings"
              control={control}
              render={({ field }) => (
                <NumberInput
                  min={1}
                  {...field}
                  onChange={(val) => setValue("servings", parseInt(val))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
            {errors.servings && (
              <FormErrorMessage>{errors.servings.message}</FormErrorMessage>
            )}
          </FormControl>

          <Flex className=" w-full justify-between gap-4">
            <FormControl isInvalid={!!errors.prepTime}>
              <FormLabel>Preparation Time (minutes)</FormLabel>
              <Controller
                name="prepTime"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    min={1}
                    {...field}
                    onChange={(val) => setValue("prepTime", parseInt(val))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              {errors.prepTime && (
                <FormErrorMessage>{errors.prepTime.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.cookTime}>
              <FormLabel>Cooking Time (minutes)</FormLabel>
              <Controller
                name="cookTime"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    min={1}
                    {...field}
                    onChange={(val) => setValue("cookTime", parseInt(val))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              {errors.cookTime && (
                <FormErrorMessage>{errors.cookTime.message}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>

          <FormControl isInvalid={!!errors.cuisine}>
            <FormLabel>Cuisine</FormLabel>
            <Controller
              name="cuisine"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Cuisine (e.g., Middle Eastern)"
                  {...field}
                />
              )}
            />
            {errors.cuisine && (
              <FormErrorMessage>{errors.cuisine.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.course}>
            <FormLabel>Course</FormLabel>
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <Select placeholder="Select course" {...field}>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                  <option>Dessert</option>
                </Select>
              )}
            />
            {errors.course && (
              <FormErrorMessage>{errors.course.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.equipment}>
            <FormLabel>Equipment</FormLabel>
            <Controller
              name="equipment"
              control={control}
              render={({ field }) => (
                <Input placeholder="Equipment (comma separated)" {...field} />
              )}
            />
            {errors.equipment && (
              <FormErrorMessage>{errors.equipment.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.ingredients}>
            <FormLabel>Ingredients</FormLabel>
            {ingredientFields.map((item, index) => (
              <Flex
                className=" w-full justify-between gap-4"
                key={item.id}
                alignItems="center"
                mt={index > 0 ? 4 : 0}
              >
                <Controller
                  name={`ingredients.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      className=" w-full"
                      placeholder="Ingredient"
                      {...field}
                      mr={2}
                    />
                  )}
                />
                {errors.ingredients && (
                  <FormErrorMessage>
                    {errors.ingredients[index]?.name?.message}
                  </FormErrorMessage>
                )}

                <Controller
                  name={`ingredients.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Quantity" {...field} mr={2} />
                  )}
                />
                {errors.ingredients && (
                  <FormErrorMessage>
                    {errors.ingredients[index]?.quantity?.message}
                  </FormErrorMessage>
                )}

                <IconButton
                  aria-label="Remove ingredient"
                  icon={<DeleteIcon />}
                  onClick={() => removeIngredient(index)}
                />
              </Flex>
            ))}
            <Box className="my-3">
              <Button
                size={"sm"}
                leftIcon={<AddIcon />}
                onClick={() => appendIngredient({ name: "", quantity: "" })}
              >
                Add Ingredient
              </Button>
            </Box>
          </FormControl>

          <FormControl isInvalid={!!errors.instructions}>
            <FormLabel>Instructions</FormLabel>
            {instructionFields.map((item, index) => (
              <Box key={item.id}>
                {" "}
                <Box display="flex" alignItems={"start"} mt={index > 0 ? 4 : 0}>
                  <FormLabel>{index + 1} </FormLabel>
                  <Controller
                    name={`instructions.${index}.instruction`}
                    control={control}
                    render={({ field }) => (
                      <Textarea placeholder="Instruction" {...field} mr={2} />
                    )}
                  />
                  <IconButton
                    aria-label="Remove instruction"
                    icon={<DeleteIcon />}
                    onClick={() => removeInstruction(index)}
                  />
                </Box>
                {errors.instructions && (
                  <FormErrorMessage>
                    {errors.instructions[index]?.instruction?.message}
                  </FormErrorMessage>
                )}
              </Box>
            ))}
            <Box className="my-3">
              <Button
                size={"sm"}
                leftIcon={<AddIcon />}
                onClick={() =>
                  appendInstruction({
                    step: instructionFields.length + 1,
                    instruction: "",
                  })
                }
              >
                Add Instruction
              </Button>
            </Box>
            {errors.instructions && (
              <FormErrorMessage>
                {(errors.instructions as any)?.message}
              </FormErrorMessage>
            )}
          </FormControl>

          {/* Thumbnail Image Input */}
          <FormControl isInvalid={!!errors.thumbnail}>
            <FormLabel>Thumbnail Image</FormLabel>
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              )}
            />
            {errors.thumbnail && <p>{errors.thumbnail.message}</p>}
          </FormControl>

          {/* Detail Image Input */}
          <FormControl isInvalid={!!errors.detailImage}>
            <FormLabel>Detail Image</FormLabel>
            <Controller
              name="detailImage"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              )}
            />
            {errors.detailImage && <p>{errors.detailImage.message}</p>}
          </FormControl>

          <FormControl isInvalid={!!errors.notes}>
            <FormLabel>Notes</FormLabel>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea placeholder="Additional notes or tips" {...field} />
              )}
            />
            {errors.notes && (
              <FormErrorMessage>{errors.notes.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            isLoading={isSubmitting}
            loadingText="Submitting"
            type="submit"
            colorScheme="orange"
            size={"lg"}
          >
            Submit Recipe
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RecipeCreateForm;
