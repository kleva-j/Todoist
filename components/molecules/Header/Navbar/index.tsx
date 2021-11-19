import { signIn, signOut, useSession } from "next-auth/client";
import { Stack, Box, Avatar, AvatarBadge, Button } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Flex, HStack } from "@chakra-ui/layout";

import HamburgerMenu from "../Hamburger";
import { SearchIcon, MenuGridIcon } from "../../../icons";

interface props {
  children: ReactNode;
  toggle: () => void;
  isOpen: Boolean;
}

export default function NavBar({ children, isOpen, toggle, ...props }: props) {
  const [session] = useSession();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      borderY="3px"
      mb={8}
      p={4}
      bg="white"
      color="#a9b1bc"
      {...props}
    >
      {children}
      {/* <HamburgerMenu toggle={toggle} isOpen={isOpen} /> */}
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        {session ? (
          <Stack
            spacing={5}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}
          >
            <SearchIcon />
            <MenuGridIcon />
            <Avatar
              loading="lazy"
              size="xs"
              src="https://img.icons8.com/fluency/48/000000/cat-profile.png"
              name="Oshigaki Kisame"
            >
              <AvatarBadge boxSize="1em" bg="green.500" />
            </Avatar>
          </Stack>
        ) : (
          <Button size="xs" variant="outline" onClick={() => signIn()}>Sign in</Button>
        )}
      </Box>
    </Flex>
  );
}
