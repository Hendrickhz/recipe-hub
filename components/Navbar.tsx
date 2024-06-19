"use client";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Spacer,
  Avatar,
  Center,
  Divider,
  SkeletonCircle,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import profileDefault from "@/assets/images/user.png";
import {
  signIn,
  signOut,
  getProviders,
  useSession,
  ClientSafeProvider,
} from "next-auth/react";
const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      if (!res) {
        return;
      }
      setProviders(res);
    };
    fetchProviders();
  }, []);
  return (
    <nav className="  bg-orange-100 py-3 sticky top-0 left-0  z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <Box className=" px-4 py-2  container">
          <Flex align="center">
            {/* Left side: Logo and Recipe Hub text */}
            <Flex align="center">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />

              <Link
                className=" ml-2 md:text-xl  text-md font-serif font-semibold text-orange-800"
                href="/"
              >
                Recipe Hub
              </Link>
            </Flex>

            <Center height="50px">
              <Divider
                colorScheme="orange"
                color={"orange"}
                className=" md:ml-4 ml-2 "
                orientation="vertical"
              />
            </Center>

            {/* Middle: Navigation links */}
            <Flex className="space-x-6">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md md:text-lg  text-orange-800 hover:text-orange-600  ${
                  pathname === "/" ? "font-semibold " : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/recipes"
                className={`px-3 py-2 rounded-md md:text-lg  text-orange-800 hover:text-orange-600  ${
                  pathname === "/recipes" ? "font-semibold " : ""
                }`}
              >
                Recipes
              </Link>
            </Flex>

            <Spacer />

            {/* Right side: Profile dropdown menu and Sign-in button */}

            <>
              {status == "loading" ? (
                <SkeletonCircle size={"12"} />
              ) : (
                <Flex align="center" className="space-x-4">
                  {session ? (
                    <Menu>
                      <Avatar
                        as={MenuButton}
                        size={{ base: "sm", md: "md" }}
                        name={session?.user?.name || "user "}
                        src={session?.user?.image || "https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png"}
                        className="mr-2"
                      />

                      <MenuList>
                        <MenuItem>
                          <Link href="/profile">Profile</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href="/saved">Saved</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href="#" onClick={() => signOut()}>
                            Logout
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <>
                      {providers &&
                        Object.values(providers).map((provider, index) => (
                          <Button
                            key={index}
                            onClick={() => signIn(provider.id)}
                            colorScheme="orange"
                            leftIcon={<FaGoogle />}
                            size={{ base: "sm", md: "md" }}
                            px={{ base: 2, md: 4 }}
                            py={{ base: 1, md: 2 }}
                          >
                            Sign In
                          </Button>
                        ))}
                    </>
                  )}
                </Flex>
              )}
            </>
          </Flex>
        </Box>
      </div>
    </nav>
  );
};

export default Navbar;
