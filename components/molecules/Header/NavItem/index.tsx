import { Link, LinkProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface props extends LinkProps {
  children?: ReactNode;
  isLast?: Boolean;
  href: string;
  bg?: string;
  bgHover?: string;
  colorActive?: string;
  colorHover?: string;
  activeProps?: LinkProps;
  _hover?: LinkProps;
}

export default function NavItem({
  children,
  isLast,
  href = "#",
  color,
  colorHover,
  colorActive,
  activeProps,
  _hover,
  ...props
}: props) {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <Link
      _active={{
        borderBottomColor: "#3025b9",
        color: colorActive,
      }}
      _hover={{
        textDecoration: "none",
        color: colorHover,
        ..._hover,
      }}
      {...props}
      {...activeProps}
      color={(isActive ? colorActive : color) || ""}
      borderBottomColor={isActive ? "#3025b9" : "transparent"}
    >
      {children}
    </Link>
  );
}
