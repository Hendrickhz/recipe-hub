"use client";
import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spacer,
  Avatar,
  Center,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(pathname);
  return (
    <nav className="  bg-orange-50 py-3">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <Box className=" px-4 py-2  container">
          <Flex align="center">
            {/* Left side: Logo and Recipe Hub text */}
            <Flex align="center">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />

              <Link
                className="text-gray-800 ml-2 text-xl font-serif font-semibold"
                href="/"
              >
                Recipe Hub
              </Link>
            </Flex>

            <Center height="50px" className=" mx-4">
              <Divider
                colorScheme="orange"
                color={"orange"}
                orientation="vertical"
              />
            </Center>

            {/* Middle: Navigation links */}
            <Flex className="space-x-6">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-lg text-orange-800 hover:text-orange-600  ${
                  pathname === "/" ? "font-semibold " : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/recipes"
                className={`px-3 py-2 rounded-md text-lg text-orange-800 hover:text-orange-600  ${
                  pathname === "/recipes" ? "font-semibold " : ""
                }`}
              >
                Recipes
              </Link>
            </Flex>

            <Spacer />

            {/* Right side: Profile dropdown menu and Sign-in button */}
            <Flex align="center" className="space-x-4">
              {isLoggedIn ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    <Avatar
                      size="sm"
                      name="Profile"
                      src="/profile.jpg"
                      className="mr-2"
                    />
                    Profile
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link href="/profile">Profile</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/saved">Saved</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/logout">Logout</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button colorScheme={"orange"} leftIcon={<FaGoogle />}>
                  Sign In
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </div>
    </nav>
  );
};

export default Navbar;
