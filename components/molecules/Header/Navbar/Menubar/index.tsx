import { Stack, Box } from "@chakra-ui/react";

import NavItem from "../../NavItem";

interface NavItem {
  label: string;
  href: string;
}

interface Props {
  isOpen: Boolean;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Start",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Planning",
    href: "/planning",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
  {
    label: "Team",
    href: "/team",
  },
];

export default function Menubar({ isOpen }: Props) {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      height="100%"
    >
      <Stack
        height="100%"
        align="end"
        justify="space-between"
        direction="row"
        minW="350px"
      >
        {NAV_ITEMS.map(({ label, href }) => (
          <NavItem
            key={label}
            href={href}
            lineHeight="47px"
            fontSize="15px"
            fontWeight={500}
            color="#808a9a"
            colorActive="#1c242d"
            colorHover="#1c242d"
            fontFamily="roboto"
            borderBottom="2px"
            userSelect="none"
          >
            {label}
          </NavItem>
        ))}
      </Stack>
    </Box>
  );
}
