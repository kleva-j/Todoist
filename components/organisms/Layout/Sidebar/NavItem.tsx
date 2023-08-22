import NextLink from "next/link";

import {
  Flex,
  Icon,
  Link,
  FlexProps,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { UseActiveLink } from "components/atoms/UseActiveLink";
import { IconType } from "react-icons";

import { LinkItemProps } from "./Content";

interface NavItemProps extends FlexProps, LinkItemProps {
  icon: IconType;
  name: string;
}

export default function NavItem({ href = "", icon, name }: NavItemProps) {
  const isActive = UseActiveLink(name);
  return (
    <NextLink href={href}>
      <Link _focus={{ boxShadow: "none" }} style={{ textDecoration: "none" }}>
        <Tooltip label={name} placement="right-end">
          <Flex
            p="3"
            my="4"
            mx="auto"
            role="group"
            align="center"
            cursor="pointer"
            borderRadius="lg"
            border="2px solid"
            borderColor={
              isActive ? useColorModeValue("primary", "white") : "transparent"
            }
            _hover={{ borderColor: useColorModeValue("primary", "white") }}
            sx={{ width: "fit-content" }}
          >
            {icon && (
              <Icon
                as={icon}
                fontSize="24"
                color={
                  isActive ? useColorModeValue("primary", "white") : "gray.500"
                }
                _groupHover={{ color: useColorModeValue("primary", "white") }}
              />
            )}
          </Flex>
        </Tooltip>
      </Link>
    </NextLink>
  );
}
