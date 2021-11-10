import React from "react";

import { Box, Flex, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { ItensMenu } from "./ItensMenu";

const SidebarLink = ({ href, children, icon }: any) => (
  <NavLink href={href}>
    <Flex align="center">
      <Box as={icon} mr={3} w={6} />
      <Text fontSize="sm" fontWeight="medium">
        {children}
      </Text>
    </Flex>
  </NavLink>
);

function PageLinks() {
  return (
    <VStack w="full" spacing={1}>
      {ItensMenu.map((navItem) => (
        <SidebarLink key={navItem.href} href={navItem.href} icon={navItem.icon}>
          {navItem.label}
        </SidebarLink>
      ))}
    </VStack>
  );
}

function SidebarContainer(props: any) {
  return (
    <Box as="aside" position="fixed" top={0} w="100%" h="full" {...props} />
  );
}

export default function Sidebar(props: any) {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <SidebarContainer bg={bgColor}>
      <Flex w="full" align="center" h={16} p={3}>
        <Flex boxSize="full" align="center" px={3}>
          <Flex boxSize="full" align="center" />
        </Flex>
      </Flex>
      <VStack
        as="nav"
        aria-label="Main navigation"
        position="relative"
        h="calc(100vh - 4rem)"
        p={3}
        overflowY="auto"
        {...props}
      >
        <PageLinks />
      </VStack>
    </SidebarContainer>
  );
}
