import { Box, CloseButton, MenuIcon } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";

interface props {
  toggle: () => void;
  isOpen: Boolean;
}

export default function HamburgerMenu({ toggle, isOpen }: props) {
  const Icon = isOpen ? <CloseButton /> : <MenuIcon />;
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      <IconButton aria-label="">
        <CloseButton />
      </IconButton>
    </Box>
  );
}
