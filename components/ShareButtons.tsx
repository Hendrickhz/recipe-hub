"use client";
import { Box, Divider, Flex, Heading, AbsoluteCenter } from "@chakra-ui/react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
interface RecipeDataProps {
  id: string;
  title: string;
}
const ShareButtons = ({ recipeData }: { recipeData: RecipeDataProps }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/recipes/${recipeData.id}`;
  return (
    <>
      <Box position="relative" py={5} mt={5}>
        <Divider />
        <AbsoluteCenter className=" bg-orange-50" px="4">
          <Heading as="h2" size="md" fontFamily={"serif"}>
            Share The Recipe
          </Heading>
        </AbsoluteCenter>
      </Box>
      <Box className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          //   quote={recipeData.title!}

          hashtag={`#${recipeData.title.split(" ").join("")}Recipe`}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={recipeData.title}
          hashtags={[`${recipeData.title.split(" ").join("")}Recipe`]}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        {/* <WhatsappShareButton
          url={shareUrl}
          title={recipeData.title}
          separator=":: "
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton> */}
        <TelegramShareButton url={shareUrl} title={`Check out this recipe: ${recipeData.title}`}>
            <TelegramIcon size={32} round={true}/>
        </TelegramShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={recipeData.title}
          body={`Check out this recipe: ${shareUrl} `}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </Box>
    </>
  );
};

export default ShareButtons;
