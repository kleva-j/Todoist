import { HiOutlineChevronRight } from "react-icons/hi";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  useColorModeValue,
  BreadcrumbLink,
  BreadcrumbItem,
  Breadcrumb,
  Heading,
  Button,
  VStack,
  chakra,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import PersonalInfo from "components/molecules/Profile/PersonalInfo";
import Notification from "components/molecules/Profile/Notification";
import Profile from "components/molecules/Profile/Profile";

import Error from "next/error";

export const PageSection = {
  personal_info: {
    heading: "Personal Information",
    description: "Set a permanent address where you can receive mail.",
    component: PersonalInfo,
  },
  profile: {
    heading: "Profile",
    description:
      "This information will be displayed publicly so be careful what you share",
    component: Profile,
  },
  notification: {
    heading: "Notification",
    description: "Decide which communications you'd like to receive and how.",
    component: Notification,
  },
};

const EditProfile: FC = () => {
  const { query } = useRouter();
  const [path] = (query?.settings || [""]) as string[];

  const section = PageSection[path as keyof typeof PageSection];

  if (section) {
    const { component: Component, heading, description } = section;
    return (
      <VStack
        mt={[5, 9]}
        mx={[4, 10]}
        direction="column"
        align="start"
        spacing="30px"
      >
        <Breadcrumb
          separator={<HiOutlineChevronRight color="gray.500" />}
          width="max-content"
        >
          <BreadcrumbItem fontSize="sm" color="primary">
            <BreadcrumbLink href="/settings" _focus={{ boxShadow: "none" }}>
              Settings
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage isLastChild fontSize="sm">
            <BreadcrumbLink
              href="/settings/notification"
              _focus={{ boxShadow: "none" }}
              _hover={{ textDecoration: "none" }}
            >
              {section?.heading || ""}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as="h1" size="lg" w="100%">
          {heading}
        </Heading>

        <chakra.form
          method="POST"
          shadow="base"
          rounded={[null, "md"]}
          overflow={{ sm: "hidden" }}
          w="fit-content"
        >
          <Stack
            px={4}
            py={5}
            bg={useColorModeValue("white", "gray.700")}
            spacing={6}
          >
            <chakra.fieldset>
              <Heading fontSize="lg" fontWeight="semibold" lineHeight="5">
                {heading}
              </Heading>
              <Text
                mt="10px"
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                {description}
              </Text>
            </chakra.fieldset>
            <Component />
          </Stack>
          <Box
            px={{ base: 4, sm: 6 }}
            py={3}
            bg={useColorModeValue("gray.50", "gray.700")}
            textAlign="right"
          >
            <Button type="submit" variant="primary" fontWeight="md">
              Save
            </Button>
          </Box>
        </chakra.form>
      </VStack>
    );
  } else {
    return <Error statusCode={404} title="This page does not exist!" />;
  }
};

export default EditProfile;
