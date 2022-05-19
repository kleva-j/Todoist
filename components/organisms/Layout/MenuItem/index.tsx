import { BoxProps, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { memo, ReactText, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface NavMenuItemProps extends BoxProps {
  to?: string;
  children: ReactText;
  isActive?: boolean;
}

const NavMenuItem = memo(
  ({ children, to = "/", ...rest }: NavMenuItemProps) => {
    const [isActive, setActive] = useState<boolean>(false);
    const { pathname, push } = useRouter();

    useEffect(() => {
      const rootPath = pathname.split("/").filter(Boolean);
      setActive(rootPath[0] === String(children).toLowerCase());
    }, [children, pathname]);

    return (
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
        _hover={{ color: useColorModeValue("gray.700", 'white') }}
        onClick={() => push(to)}
      >
        <Text display="block" fontSize={"sm"} fontWeight="semibold" {...rest}>
          {children}
        </Text>
      </Link>
    );
  }
);

NavMenuItem.displayName = "menuitem";

export { NavMenuItem };
