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
export { fetchRecipes, fetchRecipe, fetchRecentRecipes, fetchPopularRecipes };
