import {
  useColorModeValue,
  Heading,
  Button,
  chakra,
  Stack,
  Grid,
  Text,
  Box,
} from "@chakra-ui/react";
import { NextPage } from "next";

import { PageSection } from "components/molecules/Profile";

const Settings: NextPage = () => {
  return (
    <Box py={[5, 9]} mx={[4, 10]}>
      <Heading as="h1" size="lg">
        Settings
      </Heading>

      <Grid gap={8} mt={5} w="fit-content" mx="auto">
        {Object.values(PageSection).map(
          ({ heading, description, component: Component }) => (
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
              key={heading}
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
          )
        )}
      </Grid>
    </Box>
  );
};

export default Settings;
