import {
  Flex,
  Icon,
  Link,
  FlexProps,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

import { LinkItemProps } from "./Content";

interface NavItemProps extends FlexProps, LinkItemProps {
  icon: IconType;
  name: string;
}

export default function NavItem({ href = "", icon, name }: NavItemProps) {
  const router = useRouter();
  return (
    <Link
      _focus={{ boxShadow: "none" }}
      style={{ textDecoration: "none" }}
      {...(href && { onClick: () => router.push(href) })}
    >
      <Tooltip label={name} placement="right-end">
        <Flex
          p="3"
          my="4"
          mx="auto"
          role="group"
          align="center"
          cursor="pointer"
          borderRadius="lg"
          _hover={{ bg: "cyan.400", color: "white" }}
          sx={{ width: "fit-content" }}
        >
          {icon && (
            <Icon
              as={icon}
              fontSize="24"
              color={useColorModeValue("gray.500", "gray.300")}
              _groupHover={{ color: "white" }}
            />
          )}
        </Flex>
      </Tooltip>
    </Link>
  );
}


// 1. import NextLink from "next/link"

// 2. Then use it like this
{/* <NextLink href='/home' passHref>
  <Link>Home</Link>
</NextLink> */}

// CHECK BACK LATER