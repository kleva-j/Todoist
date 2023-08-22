import { Box, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { BsPlus } from "react-icons/bs";

import { Task } from "../Task";

const boardSections = {
  0: {
    index: 0,
    title: "",
    tasks: [],
  },
  1: {
    index: 1,
    title: "",
    tasks: [],
  },
  2: {
    index: 2,
    title: "",
    tasks: [],
  },
  3: {
    index: 3,
    title: "",
    tasks: [],
  },
};

export const TaskBoard = () => {
  return Object.entries(boardSections).map(([index, item]) => {
    return (
      <Flex key={item.title}>
        <HStack>
          <Heading></Heading>
          <IconButton
            aria-label="add new board"
            variant="ghost"
            size="sm"
            isRound={true}
            _hover={{ bg: "#0D74FF" }}
            icon={<BsPlus size="28px" />}
          />
        </HStack>
        This is the Taskboard
        <Box>Add new Task</Box>
      </Flex>
    );
  });
};
