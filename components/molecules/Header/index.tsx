import { useState } from "react";
import { Button, Stack, HStack, Box } from "@chakra-ui/react";

import MenuItem from "./MenuItem";
import NavBar from "./Navbar";
import Logo from "./Logo";

interface props {}

export default function Header(props: props) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBar isOpen={isOpen} toggle={toggle} {...props}>
      <HStack>
        <Logo w="100px" />
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
        >
          <Stack
            spacing={4}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
          >
            <MenuItem to="/">Home</MenuItem>
            <MenuItem to="/how">How It works </MenuItem>
            <MenuItem to="/features">Features </MenuItem>
            <MenuItem to="/pricing">Pricing </MenuItem>
            <MenuItem to="/signup" isLast>
              <Button
                size="sm"
                rounded="md"
                color={["primary.500", "primary.500", "white", "white"]}
                bg={["white", "white", "primary.500", "primary.500"]}
                _hover={{
                  bg: [
                    "primary.100",
                    "primary.100",
                    "primary.600",
                    "primary.600",
                  ],
                }}
              >
                Create Account
              </Button>
            </MenuItem>
          </Stack>
        </Box>
      </HStack>
    </NavBar>
  );
}
