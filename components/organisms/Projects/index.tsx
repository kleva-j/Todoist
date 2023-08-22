import { BsPlusLg, BsGridFill } from "react-icons/bs";
import { RiFilterLine } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";
import { ProjectType } from "./constants";
import { useState } from "react";
import {
  useColorModeValue,
  SimpleGrid,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Divider,
  Spacer,
  HStack,
  Button,
  chakra,
  Menu,
  Flex,
  Text,
} from "@chakra-ui/react";

import CardWrapper from "./CardWrapper";

export enum View {
  grid = "grid",
  list = "list",
}

interface ProjectDashboardProps {
  projects: ProjectType[];
}

interface ViewButtonArgs {
  Icon: typeof BsGridFill | typeof FaListUl;
  view: View;
}

export const ProjectDashboard = ({ projects }: ProjectDashboardProps) => {
  const [projectView, setView] = useState<View>(View.grid);
  
  const ViewCtrl = ({ Icon, view }: ViewButtonArgs) => (
    <IconButton
      size="sm"
      fontSize="20px"
      variant="ghost"
      aria-label="Grid view"
      icon={<Icon />}
      onClick={() => setView(view)}
      border="2px solid"
      borderColor="transparent"
      color={useColorModeValue("primary", "gray.300")}
      {...(projectView === view && {
        borderColor: useColorModeValue("primary", "gray.300")
      })}
      _focus={{ boxShadow: "none" }}
    />
  );

  return (
    <SimpleGrid row={2} gap={2} py={[5, 9]} mx={[4, 10]}>
      <Flex justifyContent="space-between" alignItems="center" height="70px">
        <chakra.fieldset>
          <Heading as="h1" size="lg">
            Projects
          </Heading>
          <Text my={3}>Find all your personal and shared projects.</Text>
        </chakra.fieldset>
        <Button
          leftIcon={<BsPlusLg />}
          bg="_primary.600"
          color="white"
          _hover={{ bg: "_primary.700" }}
        >
          New Project
        </Button>
      </Flex>

      <HStack>
        <Spacer />

        <ViewCtrl view={View.grid} Icon={BsGridFill} />
        <ViewCtrl view={View.list} Icon={FaListUl} />

        <Divider orientation="vertical" borderColor="gray.400" />

        <Menu>
          <MenuButton
            size="sm"
            leftIcon={<RiFilterLine />}
            as={Button}
            aria-label="Options"
            variant="outline"
            borderColor="gray.400"
          >
            Filter
          </MenuButton>
          <MenuList>
            <MenuItem command="⌘T">Active</MenuItem>
            <MenuItem command="⌘N">Paused</MenuItem>
            <MenuItem command="⌘⇧N">Deleted</MenuItem>
            <MenuItem command="⌘O">Archived</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <Divider borderColor="gray.400" mb="10px" />

      <CardWrapper view={projectView} data={projects} />
    </SimpleGrid>
  );
};
