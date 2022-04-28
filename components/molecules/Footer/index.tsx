import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import React, { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const { data: session} = useSession();

  return !session ? (
    <Box
      marginTop="auto"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2021 Taskaider. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Github"}
            href={`${process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL}`}
          >
            <BsGithub />
          </SocialButton>
          <SocialButton
            label={"Linkedin"}
            href={`${process.env.NEXT_PUBLIC_LINKEDIN_PROFILE_URL}`}
          >
            <FaLinkedin />
          </SocialButton>
          <SocialButton
            label={"Facebook"}
            href={`${process.env.NEXT_PUBLIC_FACEBOOK_PROFILE_URL}`}
          >
            <FaFacebook />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  ) : null;
}
