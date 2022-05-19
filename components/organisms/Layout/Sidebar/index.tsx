import React from "react";
import {
  DrawerContent,
  DrawerOverlay,
  Drawer,
} from "@chakra-ui/react";

import SidebarContent from "./Content";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <React.Fragment>
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}
