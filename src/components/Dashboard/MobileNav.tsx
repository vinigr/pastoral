import React, { useRef } from "react";
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import Sidebar from "./Sidebar";

export default function MobileNav() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const btnRef = useRef<any>();

  return (
    <>
      <IconButton
        aria-label="Navigation Menu"
        variant="ghost"
        display={["flex", null, "flex", "none"]}
        icon={<MdMenu />}
        onClick={onToggle}
        ref={btnRef}
        mr={4}
      />
      <Drawer
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="left"
      >
        <DrawerOverlay zIndex="overlay" />
        <DrawerContent zIndex="drawer">
          <DrawerBody p={0} w="100%">
            <Sidebar w="full" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
