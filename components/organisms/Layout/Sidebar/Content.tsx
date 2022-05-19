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
  { name: "Home", icon: FiHome, href: "" },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings, href: "/settings/profile" },
];

interface SidebarProps extends BoxProps {
  onClose?: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w="80px"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          display={{ base: "none", md: "flex" }}
        >
          TDR
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
