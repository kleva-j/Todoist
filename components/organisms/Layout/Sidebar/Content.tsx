import { IconType } from "react-icons";
import {
  useColorModeValue,
  CloseButton,
  BoxProps,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";

import {
  FiTrendingUp,
  FiSettings,
  FiCompass,
  FiHome,
  FiStar,
} from "react-icons/fi";

import NavItem from "./NavItem";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href?: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings, href: "/settings" },
];

interface SidebarProps extends BoxProps {
  onClose?: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      h="full"
      w="80px"
      pos="fixed"
      borderRight="1px"
      bg={useColorModeValue("white", "gray.900")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily="monospace"
          display={{ base: "none", md: "flex" }}
        >
          TK
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} {...link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
