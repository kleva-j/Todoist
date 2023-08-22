import {
  useColorModeValue,
  VisuallyHidden,
  FormHelperText,
  InputLeftAddon,
  FormControl,
  InputGroup,
  SimpleGrid,
  FormLabel,
  Textarea,
  GridItem,
  chakra,
  Button,
  Avatar,
  Stack,
  Input,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export default function Profile() {
  return (
    <>
      <SimpleGrid columns={3} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color={useColorModeValue("gray.700", "gray.50")}
          >
            Website
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg={useColorModeValue("gray.50", "gray.800")}
              color={useColorModeValue("gray.500", "gay.50")}
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl>
      </SimpleGrid>

      <div>
        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color={useColorModeValue("gray.700", "gray.50")}
          >
            About
          </FormLabel>
          <Textarea
            placeholder="you@example.com"
            mt={1}
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{ sm: "sm" }}
          />
          <FormHelperText>
            Brief description for your profile. URLs are hyperlinked.
          </FormHelperText>
        </FormControl>
      </div>

      <FormControl>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Photo
        </FormLabel>
        <Flex alignItems="center" mt={1}>
          <Avatar
            boxSize={12}
            bg={useColorModeValue("gray.100", "gray.800")}
            icon={
              <Icon
                as={FaUser}
                boxSize={9}
                mt={3}
                rounded="full"
                color={useColorModeValue("gray.300", "gray.700")}
              />
            }
          />
          <Button
            type="button"
            ml={5}
            variant="outline"
            size="sm"
            fontWeight="medium"
            _focus={{ shadow: "none" }}
          >
            Change
          </Button>
        </Flex>
      </FormControl>

      <FormControl>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Cover photo
        </FormLabel>
        <Flex
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          borderColor={useColorModeValue("gray.300", "gray.500")}
          borderStyle="dashed"
          rounded="md"
        >
          <Stack spacing={1} textAlign="center">
            <Icon
              mx="auto"
              boxSize={12}
              color={useColorModeValue("gray.400", "gray.500")}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
            <Flex
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
              alignItems="baseline"
            >
              <chakra.label
                htmlFor="file-upload"
                cursor="pointer"
                rounded="md"
                fontSize="md"
                color={useColorModeValue("brand.600", "brand.200")}
                pos="relative"
                _hover={{
                  color: useColorModeValue("brand.400", "brand.300"),
                }}
              >
                <span>Upload a file</span>
                <VisuallyHidden>
                  <input id="file-upload" name="file-upload" type="file" />
                </VisuallyHidden>
              </chakra.label>
              <Text pl={1}>or drag and drop</Text>
            </Flex>
            <Text
              fontSize="xs"
              color={useColorModeValue("gray.500", "gray.50")}
            >
              PNG, JPG, GIF up to 10MB
            </Text>
          </Stack>
        </Flex>
      </FormControl>
    </>
  );
}
