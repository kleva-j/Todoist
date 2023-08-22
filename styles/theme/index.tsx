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
    _primary: {
      50: "#3126b9",
      100: "#4230bd",
      200: "#503ac0",
      300: "#5d44c4",
      400: "#684ec8",
      500: "#7358cb",
      600: "#7d62cf",
      700: "#876cd2",
      800: "#9176d6",
      900: "#9a80d9",
    },
    _secondary: {
      50: "#ff6f91",
      100: "#fd7d99",
      200: "#fb8ba1",
      300: "#f997aa",
      400: "#f5a4b2",
      500: "#f2b0ba",
      600: "#eebbc3",
      700: "#e9c7cc",
      800: "#e3d2d4",
      900: "#dddddd",
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
    cssVarPrefix: "tk",
  },
};

export default extendTheme(overrides);
