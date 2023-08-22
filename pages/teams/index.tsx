import { Heading, Box } from "@chakra-ui/react";
import { NextPage } from "next";

const Teams: NextPage = () => {
  return (
    <Box py={[5, 9]} mx={[4, 10]}>
      <Heading as="h1" size="lg">
        Teams
      </Heading>
    </Box>
  );
};

export default Teams;
