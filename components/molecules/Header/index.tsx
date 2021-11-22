import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import { useSession } from "next-auth/client";

import Logo from "./Logo";
import NavBar from "./Navbar";
import Menubar from "./Navbar/Menubar";

interface props {}

export default function Header(props: props) {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [session] = useSession();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBar isOpen={isOpen} toggle={toggle} {...props}>
      <HStack height="100%">
        <Logo w="100px" />
        {session && (<Menubar isOpen={isOpen} />)}
      </HStack>
    </NavBar>
  );
}
