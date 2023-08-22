import { Scheduler } from "components/molecules/Calendar";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";

const Calendar: NextPage = () => {
  return (
    <Box py={[2, 6]} mx={[2, 6]}>
      <Scheduler />
    </Box>
  );
};

export default Calendar;
