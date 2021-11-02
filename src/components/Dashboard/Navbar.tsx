import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { NavLink } from "./NavLink";

import { ItensMenu } from "./ItensMenu";

export default function Navbar(props: any) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box {...props}>
      <Flex
        bg={"white"}
        w="full"
        color={"gray.600"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {ItensMenu.map((navItem) => (
        <SidebarLink key={navItem.href} href={navItem.href} icon={navItem.icon}>
          {navItem.label}
        </SidebarLink>
      ))}
    </Stack>
  );
};

const SidebarLink = ({ href, children, icon }: any) => (
  <NavLink href={href}>
    <Flex align="center">
      <Box as={icon} mr={3} w={6} />
      <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
        {children}
      </Text>
    </Flex>
  </NavLink>
);
