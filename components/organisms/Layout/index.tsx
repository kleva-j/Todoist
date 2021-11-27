import { Flex } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

export default function Layout({ children, ...rest }: props) {
  return (
    <Flex direction="column" bg="#fafcff" minH="100vh" {...rest}>
      {children}
    </Flex>
  );
}
