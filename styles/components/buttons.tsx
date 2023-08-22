import {
  whiten,
  darken,
  mode,
  StyleFunctionProps,
} from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: StyleFunctionProps) => ({
      bg: whiten("primary", 20),
      color: 'white',
      _hover: {
        bg: mode(whiten("primary", 10), whiten("primary", 20))(props),
      },
    }),
    primaryOutline: () => ({
      bg: "transparent",
      border: "2px solid",
      borderColor:  whiten('primary', 20),
      color: whiten('primary', 20),
    }),
    secondary: (props: StyleFunctionProps) => ({
      bg: "secondary",
      color: "white",
      _hover: {
        bg: mode(darken("secondary", 20), whiten("secondary", 20))(props),
      },
    }),
  },
  defaultProps: {},
};
