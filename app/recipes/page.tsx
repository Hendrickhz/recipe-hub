"use client";
import RecipeCard from "@/components/RecipeCard";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import { Recipe } from "@/interfaces";
import React, { useEffect, useState } from "react";

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        if (res.status == 200) {
          const data = await res.json();
          setRecipes(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);
  console.log(recipes);
  if (loading) {
    return   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-6 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {[0, 1, 2].map((i) => <RecipeCardSkeleton key={i} />)}
    </div> ;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-6 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipePage;
