"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const RecipeSavedButton = ({ recipeId }: { recipeId: string }) => {
  const [isSaved, setIsSaved] = useState();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleClick = async () => {
    if (!recipeId) return;
    if (!userId) return toast.error("You need to login to save the recipe,");
    try {
      const res = await fetch(`/api/saved`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
      });
      if (res.status == 200) {
        const data = await res.json();
        setIsSaved(data.isSaved);
        return toast(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save");
    }
  };
  useEffect(() => {
    const checkIsSave = async () => {
      try {
        const res = await fetch(`/api/saved/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeId }),
        });
        if (res.status == 200) {
          const data = await res.json();
          setIsSaved(data.isSaved);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (userId !== null) {
      checkIsSave();
    }
  }, [userId, recipeId]);
  if (loading) {
    return (
      <div>
        <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
          <FaBookmark className="mr-2" />
          Loading...
        </button>
      </div>
    );
  }
  return (
    <div>
      {isSaved ? (
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaRegBookmark className="mr-2" />
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaBookmark className="mr-2" />
        </button>
      )}
    </div>
  );
};

export default RecipeSavedButton;
