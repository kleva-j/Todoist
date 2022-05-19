import { useRouter } from "next/router";
import React from "react";

import {
  useColorModeValue,
  SimpleGrid,
  TabPanels,
  GridItem,
  TabList,
  Heading,
  Text,
  Tabs,
  Box,
  Tab,
} from "@chakra-ui/react";

import PersonalInfo from "components/molecules/Profile/EditProfile/PersonalInfo";
import Notification from "components/molecules/Profile/EditProfile/Notification";
import Profile from "components/molecules/Profile/EditProfile/Profile";

const PageSection = {
  profile: {
    heading: "Profile",
    description:
      "This information will be displayed publicly so be careful what you share",
    component: <Profile />,
  },
  personal_info: {
    heading: "Personal Information",
    description: "Use a permanent address where you can receive mail.",
    component: <PersonalInfo />,
  },
  notification: {
    heading: "Notification",
    description: "Decide which communications you'd like to receive and how.",
    component: <Notification />,
  },
};

export default function EditProfile() {
  const { query } = useRouter();
  const [path] = (query?.settings || [""]) as string[];

  const section = PageSection[path as keyof typeof PageSection];

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      px={{ base: 4, md: 8 }}
      py={{ base: 2, md: 4 }}
      maxWidth="1200px"
      margin="auto"
    >
      <Tabs isManual variant="enclosed">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Personal Information</Tab>
          <Tab>Notification</Tab>
        </TabList>
        <TabPanels>
          <SimpleGrid
            display={{ base: "initial", md: "grid" }}
            columns={{ md: 3 }}
            spacing={{ md: 6 }}
          >
            <GridItem colSpan={{ md: 1 }}>
              <Box px={[4, 0]}>
                <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                  {section?.heading}
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  {section?.description}
                </Text>
              </Box>
            </GridItem>
            {section?.component}
          </SimpleGrid>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
