import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "styles/components/buttons";

const overrides = {
  colors: {
    brand: {
      50: "#ecefff",
      100: "#cbceeb",
      200: "#a9aed6",
      300: "#888ec5",
      400: "#666db3",
      500: "#4d5499",
      600: "#3c4178",
      700: "#2a2f57",
      800: "#181c37",
      900: "#080819",
    },
    text: {
      100: "#DBDED3",
      500: "#A1A7AA",
      900: "#90A1AA",
    },
    background: {
      default: "#dfe8ec",
    },
    primary: "#3126b9",
    secondary: "#FF6F91",
    highlight: "#00c9A7",
    warning: "#FFC75F",
    danger: "#C34A36",
    info: "#0bc5ea",
    error: "#FF0000",
  },
  components: {
    Button,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
    cssVarPrefix: "txr",
  },
};

export default extendTheme(overrides);
