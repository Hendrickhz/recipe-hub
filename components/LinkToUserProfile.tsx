"use client";
import { Link, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";

const LinkToUserProfile = ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  // const { data: session } = useSession();
  let hrefLink;
  // if(!session || !session.user){
  //   hrefLink= `/users/${id}`;
  // }else{
  //   const isLoggedInUser = id == session?.user?.id;
  // hrefLink= isLoggedInUser ? '/profile' : `/users/${id}`
  // }
  // console.log(session)
  return (
    <Text fontFamily={"serif"} fontSize={"large"}>
      Shared by{" "}
      <Link fontWeight={"700"} href={`/users/${id}`}>
        {username}
      </Link>
    </Text>
  );
};

export default LinkToUserProfile;
