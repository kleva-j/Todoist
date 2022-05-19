import { useColorModeValue, useDisclosure, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import Sidebar from "components/organisms/Layout/Sidebar";
import Navbar from "components/organisms/Layout/Navbar";
import AuthProvider from "context/auth";

interface IProps {
  children: ReactNode;
}

export default function Authenticated({ children }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AuthProvider>
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Navbar onOpen={onOpen} />
        <Box ml={{ base: 0, md: "80px" }} transition=".3s ease">
          {children}
        </Box>
      </Box>
    </AuthProvider>
  );
}
