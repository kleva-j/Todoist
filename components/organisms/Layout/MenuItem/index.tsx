import { BoxProps, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { memo, ReactText } from "react";
import NextLink from "next/link";

import { UseActiveLink } from "components/atoms/UseActiveLink";

interface NavMenuItemProps extends BoxProps {
  to?: string;
  children: ReactText;
}

const NavMenuItem = memo(
  ({ children, to = "/", ...rest }: NavMenuItemProps) => {
    const isActive = UseActiveLink(children);

    return (
      <NextLink href={to}>
        <Link
          h="100%"
          display="flex"
          alignItems="center"
          borderBottom="2px solid"
          borderTop="2px solid transparent"
          color={useColorModeValue(
            isActive ? "gray.700" : "gray.500",
            isActive ? "white" : "gray.500"
          )}
          borderBottomColor={useColorModeValue(
            isActive ? "#3126b9" : "transparent",
            isActive ? "white" : "transparent"
          )}
          _hover={{ color: useColorModeValue("gray.700", "white") }}
        >
          <Text display="block" fontSize={"sm"} fontWeight="semibold" {...rest}>
            {children}
          </Text>
        </Link>
      </NextLink>
    );
  }
);

NavMenuItem.displayName = "menuitem";

export { NavMenuItem };
