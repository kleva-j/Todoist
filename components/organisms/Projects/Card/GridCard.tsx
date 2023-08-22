import { IoIosFolderOpen } from "react-icons/io";
import { motion } from "framer-motion";

import {
  useColorModeValue,
  Heading,
  Spacer,
  VStack,
  Flex,
  Text,
} from "@chakra-ui/react";

import { ProjectType } from "components/organisms/Projects/constants";
import { MenuButtons } from "components/molecules/CardMenuButton";

import NextLink from "next/link";

export const GridCard = ({ title, id }: ProjectType) => {
  const MotionVStack = motion(VStack);
  return (
    <NextLink href={`/projects/${id}`}>
      <MotionVStack
        align="start"
        borderRadius="lg"
        minHeight="200px"
        p={5}
        shadow="sm"
        borderWidth="1px"
        bg={useColorModeValue("gray.50", "gray.700")}
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("gray.50", "gray.600"),
          shadow: "md",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <Flex w="full" align="center">
          <IoIosFolderOpen fontSize="60px" color="green" />
          <Spacer />
          <MenuButtons />
        </Flex>
        <Spacer />
        <Heading
          fontSize="lg"
          color={useColorModeValue("gray.800", "gray.200")}
        >
          {title}
        </Heading>
        <Text mt={4} fontSize="xs" color="gray.500">
          Modified by me 12/20/20
        </Text>
      </MotionVStack>
    </NextLink>
  );
};

export default GridCard;
