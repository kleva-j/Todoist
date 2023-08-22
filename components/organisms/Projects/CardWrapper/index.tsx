import {
  useColorModeValue,
  SimpleGrid,
  Tooltip,
  VStack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { BsPlusCircle } from "react-icons/bs";

import { GridCard, ListCard } from "../Card";
import { ProjectType } from "../constants";
import { View } from "..";

interface CardWrapperProps {
  view: View;
  data: ProjectType[];
}

const CardWrapper = ({ view, data }: CardWrapperProps) => {
  const [Wrapper, Card, args] =
    view === View.grid
      ? [SimpleGrid, GridCard, { minChildWidth: "240px", spacing: "40px" }]
      : [VStack, ListCard, { align: "stretch" }];

  return (
    <Wrapper {...args}>
      <AnimatePresence>
        {data.map((item) => (
          <Card key={item.title} {...item} />
        ))}
        {view === View.grid && (
          <Flex
            borderRadius="lg"
            minHeight="200px"
            justify="center"
            align="center"
            borderWidth="2px"
            bg={"transparent"}
            cursor="pointer"
            borderStyle="stroke"
            _hover={{
              bg: useColorModeValue("gray.100", "gray.600"),
              shadow: "sm",
            }}
          >
            <Tooltip label="Add new project" placement="right-end">
              <Box position="relative">
                <BsPlusCircle fontSize="60px" color="#3126b9" />
              </Box>
            </Tooltip>
          </Flex>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default CardWrapper;
