import {
  useMultiStyleConfig,
  useColorModeValue,
  TabProps,
  Button,
  useTab,
} from "@chakra-ui/react";
import { forwardRef, Ref } from "react";

interface CustomTabProps extends TabProps {}

type RefProp = Ref<HTMLButtonElement> | undefined;

export const CustomTab = forwardRef((props: CustomTabProps, ref: RefProp) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps["aria-selected"];
  const { tab } = useMultiStyleConfig("Tabs", tabProps);

  return (
    <Button
      __css={tab}
      {...tabProps}
      _focus={{ boxShadow: "none" }}
      style={{ textDecoration: "none" }}
      borderBottom="2px solid"
      marginBottom=".1px"
      fontSize="sm"
      color={useColorModeValue("gray.700", "gray.300")}
      px="0"
      sx={{
        marginInline: "15px",

        "&:first-of-type": {
          marginInlineStart: "0px",
        },

        "&:last-of-type": {
          marginInlineEnd: "0px",
        },
        "&[aria-selected=true], &[data-selected]": {
          borderColor: useColorModeValue("primary", "_primary.900"),
          color: useColorModeValue("primary", "_primary.900"),
        },
      }}
    >
      {tabProps.children}
    </Button>
  );
});

CustomTab.displayName = "Tab";
