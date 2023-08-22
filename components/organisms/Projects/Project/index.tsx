import {
  ButtonGroup,
  SimpleGrid,
  MenuButton,
  TabPanels,
  TabPanel,
  MenuList,
  MenuItem,
  TabList,
  Heading,
  Spacer,
  Button,
  Flex,
  Tabs,
  Box,
  Menu,
} from "@chakra-ui/react";
import { UseFullscreenStatus } from "components/atoms/UseFullScreen";
import { RiFilterLine, RiFullscreenFill } from "react-icons/ri";
import { CustomTab } from "components/atoms/Tab";
import { ProjectType, Tablist } from "../constants";
import { useState, useRef } from "react";

interface ProjectProps {
  project: ProjectType;
  currentTab?: string;
  currentTabIndex: number;
}

const MenuItems = Object.values(Tablist).map(({ title }) => title);

const Project = ({ project, currentTab, currentTabIndex }: ProjectProps) => {
  const BoxRef = useRef(null);
  const { isFullscreen, setFullscreen } = UseFullscreenStatus(BoxRef);
  const [tabIndex, setTabIndex] = useState<number>(currentTabIndex);

  const handleTabsChange = (index: number): void => {
    setTabIndex(index);
  };

  return (
    <SimpleGrid row={2} gap={2} mt={5} mx={10}>
      <Flex justifyContent="space-between" alignItems="center" height="70px">
        <Heading as="h1" size="lg">
          {project.title}
        </Heading>
        <Button bg="_primary.600" color="white" _hover={{ bg: "_primary.700" }}>
          Show Backlog
        </Button>
      </Flex>
      <Box ref={BoxRef}>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList borderBottom="1px solid">
            {MenuItems.map((item) => (
              <CustomTab key={item}>{item}</CustomTab>
            ))}
            <Spacer />
            <ButtonGroup gap="1" mb="6px">
              <Button
                size="sm"
                variant="outline"
                borderColor="gray.400"
                leftIcon={<RiFullscreenFill />}
                onClick={setFullscreen}
                disabled
              >
                Full screen
              </Button>
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
            </ButtonGroup>
          </TabList>
          <TabPanels>
            {MenuItems.map((item, index) => (
              <TabPanel key={index}>{item}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </SimpleGrid>
  );
};

export default Project;
