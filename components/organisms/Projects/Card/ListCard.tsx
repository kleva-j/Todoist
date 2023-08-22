import { VscTasklist } from "react-icons/vsc";
import { motion } from "framer-motion";
import NextLink from "next/link";

import {
  useColorModeValue,
  AvatarGroup,
  Checkbox,
  Heading,
  chakra,
  HStack,
  Spacer,
  Avatar,
  Text,
  Flex,
  Box,
  Tag,
} from "@chakra-ui/react";
import { ProjectType } from "../constants";

import { MenuButtons } from "components/molecules/CardMenuButton";

export const ListCard = ({ id, title }: ProjectType) => {
  const MotionHStack = motion(HStack);
  return (
    <NextLink href={`/projects/${id}`}>
      <MotionHStack
        align="center"
        borderRadius="sm"
        h="80px"
        p={5}
        w="full"
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
        justify="start"
        spacing={4}
        pr={12}
      >
        <Box onClick={(event) => event.stopPropagation()}>
          <Checkbox
            size="lg"
            colorScheme="gray"
            _checked={{ boxShadow: "none", outline: "none" }}
            _focus={{ boxShadow: "none", outline: "none" }}
          />
        </Box>
        <chakra.fieldset>
          <Heading
            fontSize="lg"
            color={useColorModeValue("gray.800", "gray.200")}
          >
            {title}
          </Heading>
          <Text mt={2} fontSize="xs" color="gray.500">
            modified by me 12/07/20
          </Text>
        </chakra.fieldset>

        <Spacer />

        <HStack spacing={20}>
          <Flex align="center" justify="space-between">
            <VscTasklist fontSize="22px" />
            <Text ml={1}>5</Text>
          </Flex>

          <HStack spacing={2}>
            {["react", "vue", "svelte"].map((title) => (
              <Tag key={title} size="sm" variant="solid">
                {title}
              </Tag>
            ))}
          </HStack>

          <AvatarGroup
            size="sm"
            max={3}
            onClick={(event) => event.stopPropagation()}
          >
            <Avatar name="Ryan Florence" />
            <Avatar name="Segun Adebayo" />
            <Avatar name="Kent Dodds" />
            <Avatar name="Prosper Otemuyiwa" />
            <Avatar name="Christian Nwamba" />
          </AvatarGroup>

          <MenuButtons variant="ghost" />
        </HStack>
      </MotionHStack>
    </NextLink>
  );
};

export default ListCard;
