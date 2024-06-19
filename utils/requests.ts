const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchRecipes() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/recipes`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error("Failed to Fetch Recipes");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function fetchRecentRecipes() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/recipes?recent=true`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to Fetch Recipes");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function fetchPopularRecipes() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/recipes/popular`);
    if (!res.ok) {
      throw new Error("Failed to Fetch Recipes");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchRecipe(id: string) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/recipes/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to Fetch Recipes");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchRecipesByTag(tag: string) {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/recipes/tags/${tag}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to Fetch Recipes by tag.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchUserAndRecipesData(userId: string) {
  try {
    if (!apiDomain) {
      return { user: null, recipes: [] };
    }
    const res = await fetch(`${apiDomain}/recipes/users/${userId}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to Fetch user and recipes data.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { user: null, recipes: [] };
  }
}
// async function fetchSavedRecipes() {
//   try {
//     if (!apiDomain) {
//       return [];
//     }
//     const res = await fetch(`${apiDomain}/saved`,{method:'get'});
//     if (!res.ok) {
//       throw new Error("Failed to Fetch saved recipes data.");
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
export {
  fetchRecipes,
  fetchRecipe,
  fetchRecentRecipes,
  fetchPopularRecipes,
  fetchRecipesByTag,
  fetchUserAndRecipesData,
  // fetchSavedRecipes,
};
