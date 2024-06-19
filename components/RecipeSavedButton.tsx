// @ts-nocheck
"use client";
import { Box, IconButton, Spinner, Tooltip } from "@chakra-ui/react";
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
        return toast.success(data.message);
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
      <Box>
        <Spinner color="orange.600" size={'sm'}/>
      </Box>
    );
  }
  return (
    <Box>
      {isSaved ? (
        <Tooltip placement="top" label="Remove from the saved list.">
          <IconButton
          colorScheme="orange"
          aria-label="remove-save=btn"
          variant={'ghost'}
          icon={<FaBookmark />}
          onClick={handleClick}     size={'lg'}
        />
        </Tooltip>
      ) : (
        <Tooltip placement="top" label="Add to the saved list.">
        <IconButton
        colorScheme="orange"
        size={'lg'}
        aria-label="add-save=btn"
        variant={'ghost'}
        icon={<FaRegBookmark />}
        onClick={handleClick}
      />
      </Tooltip>
      )}
    </Box>
  );
};

export default RecipeSavedButton;
