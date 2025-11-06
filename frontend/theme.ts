import { extendTheme, Theme } from "@chakra-ui/react";
import tv from "./util/themeVariable";

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    cssVarPrefix: "lccs",
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
  shadows: {
    outline: "#3c98bd 0 0 0 3px",
    thick: "#3c98bd 0 0 0 5px",
    alternate: "#FBC390 0 0 0 3px",
    error: "#F56565 0 0 0 3px",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 6,
      },
      variants: {
        primary: {
          bg: "primary",
          color: "white",
          _hover: { bg: "#3586a6" },
          _active: { bg: "#2d718c" },
          _focus: { boxShadow: tv("shadows.alternate") },
          _disabled: { bg: "primary" },
        },
      },
    },
  },
  colors: {
    background: "#171723",
    alternateBackground: "#282838",
    primary: "#0c6f96",
    primaryLight: "#229ecf",
    secondary: "#FBC390",
    tertiary: "#B794F4",
    complimentary: "#E7D6Cf",
  },
});
