import type { Metadata } from "next";
import "./globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Recipe Hub",
  description:
    "Explore a world of culinary delights with Recipe Hub. Find recipes for every occasion, from breakfast to dinner, snacks to desserts, and everything in between.",
  icons: {
    icon: "/logo.png",
  },
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.png" type="image/x-icon" />
        </head>
        <body className=" bg-orange-50 flex flex-col min-h-screen">
          <ChakraProvider>
            <Box>
              <Navbar />
              <Box as="main">{children}</Box>
            </Box>
            <Footer />
            <ToastContainer />
          </ChakraProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
