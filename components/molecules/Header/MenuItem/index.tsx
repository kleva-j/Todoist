import React, { ReactNode } from "react";

import { Text } from "@chakra-ui/layout";

import Link from "next/link";

interface props {
  children: ReactNode;
  isLast?: Boolean;
  to: string;
}

export default function MenuItem({ children, isLast, to = "/" }: props) {
  return (
    <Link href={to}>
      <a>
        <Text display="block" color="#a9b1bc" fontFamily="roboto" fontWeight="400">{children}</Text>
      </a>
    </Link>
  );
}
