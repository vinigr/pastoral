import React from "react";

import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar display={["none", null, null, "flex"]} />
      <Flex as="main" bg="white">
        <Flex direction="column" w="full">
          <Box
            w="full"
            as="section"
            px={[4, 6, 8]}
            py={4}
            h="calc(100vh - 70px)"
          >
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;
