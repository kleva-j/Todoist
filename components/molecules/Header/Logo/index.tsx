import { Box, Text } from "@chakra-ui/react";

interface props {
  [key: string]: any;
}

export default function Logo(props: props) {
  return (
    <Box {...props}>
      <Text fontSize="lg" color="red" fontWeight="bold" fontFamily="roboto">
        Logo
      </Text>
    </Box>
  )
}
