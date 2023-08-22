import {
  useColorModeValue,
  FormControl,
  SimpleGrid,
  FormLabel,
  GridItem,
  Select,
  Input,
} from "@chakra-ui/react";

export default function PersonalInfo() {
  return (
    <SimpleGrid columns={6} spacing={6}>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="first_name"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          First name
        </FormLabel>
        <Input
          type="text"
          name="first_name"
          id="first_name"
          autoComplete="given-name"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="last_name"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Last name
        </FormLabel>
        <Input
          type="text"
          name="last_name"
          id="last_name"
          autoComplete="family-name"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 4]}>
        <FormLabel
          htmlFor="email_address"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Email address
        </FormLabel>
        <Input
          type="text"
          name="email_address"
          id="email_address"
          autoComplete="email"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Country / Region
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          Street address
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          State / Province
        </FormLabel>
        <Input
          type="text"
          name="state"
          id="state"
          autoComplete="state"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          ZIP / Postal
        </FormLabel>
        <Input
          type="text"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </SimpleGrid>
  );
}
