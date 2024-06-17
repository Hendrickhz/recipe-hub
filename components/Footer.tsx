import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box as="section" className="bg-orange-100 py-6 mt-auto">
      <Box className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-orange-800 flex justify-between">
        <Text>&copy; {currentYear} Recipe Hub. All rights reserved.</Text>
        <Text>Developed by <Link fontFamily={'serif'} href="https://github.com/Hendrickhz">Hendrick</Link></Text>
      </Box>
    </Box>
  );
};

export default Footer;
