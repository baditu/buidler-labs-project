import { Box } from "@chakra-ui/react";
import React from "react";
import NavBar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      overflowX={"hidden"}
      overflowY={"hidden"}
      bgColor={"#FBFADA"}
      minHeight="100vh"
      w={"100vw"}
      minW={"320px"}
    >
      <header>
        <NavBar />
      </header>
      {children}
    </Box>
  );
};

export default Layout;
