import {
  useColorModeValue,
  InputLeftElement,
  useColorMode,
  MenuDivider,
  IconButton,
  MenuButton,
  InputGroup,
  FlexProps,
  MenuGroup,
  MenuList,
  MenuItem,
  HStack,
  Avatar,
  Input,
  Flex,
  Menu,
  Text,
  Box,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { BsMoon, BsSun, BsPlusCircle } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { memo } from "react";

import { NavMenuItem } from "../MenuItem";
import Badge from "components/atoms/Badge";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Navbar = memo(({ onOpen }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      px={4}
      height="16"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Taskaider
      </Text>

      <HStack
        display={{ base: "none", md: "flex" }}
        spacing={{ base: "0", md: "6" }}
        alignContent={"stretch"}
        height="100%"
        ml="80px"
        mr="auto"
      >
        <NavMenuItem to="/">Overview</NavMenuItem>
        <NavMenuItem to="/projects">Projects</NavMenuItem>
        <NavMenuItem to="/calendar">Calendar</NavMenuItem>
        <NavMenuItem to="/teams">Teams</NavMenuItem>
      </HStack>

      <HStack spacing="2">
        <HStack spacing="1">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray.300" />
            </InputLeftElement>
            <Input type="text" placeholder="Search" />
          </InputGroup>
          <IconButton
            isRound={true}
            icon={<CgMenuGridO />}
            size="md"
            fontSize="24px"
            variant="ghost"
            aria-label="Color Mode Indicator"
          />
          <IconButton
            isRound={true}
            icon={<BsPlusCircle />}
            size="md"
            variant="ghost"
            aria-label="Color Mode Indicator"
          />
          <IconButton
            isRound={true}
            icon={colorMode === "light" ? <BsMoon /> : <BsSun />}
            size="md"
            variant="solid"
            aria-label="Color Mode Indicator"
            onClick={toggleColorMode}
          />
          {/* <IconButton
            isRound={true}
            icon={<FiBell />}
            size="md"
            variant="ghost"
            aria-label="open menu"
            ml="0"
          /> */}
          <Badge count={10} />
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <Text fontSize="sm" ml="2">
                  Justina Clark
                </Text>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuGroup title="Profile">
                <MenuItem>My Account</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
              </MenuGroup>

              <MenuDivider />

              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup>

              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
});

Navbar.displayName = "Navigation bar";

export default Navbar;
