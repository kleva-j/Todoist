import React from "react";
import {
  useColorModeValue,
  RadioGroup,
  Checkbox,
  chakra,
  Stack,
  Radio,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";

export default function Notification() {
  return (
    <>
      <chakra.fieldset>
        <Box
          as="legend"
          fontSize="md"
          color={useColorModeValue("gray.900", "gray.50")}
        >
          By Email
        </Box>
        <Stack mt={4} spacing={4}>
          <Flex alignItems="start">
            <Flex alignItems="center" h={5}>
              <Checkbox colorScheme="brand" id="comments" rounded="md" />
            </Flex>
            <Box ml={3} fontSize="sm">
              <chakra.label
                htmlFor="comments"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                Comments
              </chakra.label>
              <Text color={useColorModeValue("gray.500", "gray.400")}>
                Get notified when someones posts a comment on a posting.
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="start">
            <Flex alignItems="center" h={5}>
              <Checkbox colorScheme="brand" id="candidates" rounded="md" />
            </Flex>
            <Box ml={3} fontSize="sm">
              <chakra.label
                htmlFor="candidates"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                Candidates
              </chakra.label>
              <Text color={useColorModeValue("gray.500", "gray.400")}>
                Get notified when a candidate applies for a job.
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="start">
            <Flex alignItems="center" h={5}>
              <Checkbox colorScheme="brand" id="offers" rounded="md" />
            </Flex>
            <Box ml={3} fontSize="sm">
              <chakra.label
                htmlFor="offers"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                Offers
              </chakra.label>
              <Text color={useColorModeValue("gray.500", "gray.400")}>
                Get notified when a candidate accepts or rejects an offer.
              </Text>
            </Box>
          </Flex>
        </Stack>
      </chakra.fieldset>
      <chakra.fieldset>
        <Box
          as="legend"
          fontSize="md"
          color={useColorModeValue("gray.900", "gray.50")}
        >
          Push Notifications
          <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
            These are delivered via SMS to your mobile phone.
          </Text>
        </Box>
        <RadioGroup
          fontSize="sm"
          color={useColorModeValue("gray.700", "gray.50")}
          colorScheme="brand"
          mt={4}
          defaultValue="1"
        >
          <Stack spacing={4}>
            <Radio spacing={3} value="1">
              Everything
            </Radio>
            <Radio spacing={3} value="2">
              Same as email
            </Radio>
            <Radio spacing={3} value="3">
              No push notifications
            </Radio>
          </Stack>
        </RadioGroup>
      </chakra.fieldset>
    </>
  );
}
