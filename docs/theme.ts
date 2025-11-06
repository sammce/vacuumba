import { extendTheme } from "@chakra-ui/react";
import tv from "./util/themeVariable";

export const theme = extendTheme({
  styles: {
    global: {
      ".mdx-wrapper": {
        h1: {
          fontSize: "7xl",
          textAlign: "center",
        },
        h2: { fontSize: "4xl" },
        h3: { fontSize: "2xl" },
        h4: { fontSize: "2xl" },
        h5: { fontSize: "xl" },
        h6: { fontSize: "lg" },
        p: { margin: "1.5rem 0" },
        annotation: { display: "none" },
        blockquote: {
          m: 6,
          px: 6,
          py: 3,
          bg: "contrastBackground",
          borderRadius: 8,
          borderLeft: `8px solid ${tv("colors.primary")}`,
        },
        ul: { ml: 5 },
        px: 6,
        py: 3,
        a: { color: "blue.300" },
        "p > code": { color: "tertiary" },
        code: { borderRadius: 8 },
      },
    },
  },
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
    alternate: "#FBC390 0 0 0 3px",
    error: "#F56565 0 0 0 3px",
  },
  components: {
    Text: {
      variants: {
        subheading: {
          letterSpacing: "wider",
          fontSize: "md",
          textTransform: "uppercase",
          color: "gray.500",
          fontWeight: "bold",
        },
      },
    },
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
    contrastBackground: "#282838",
    primary: "#3c98bd",
    secondary: "#B794F4",
    tertiary: "#FBC390",
    complimentary: "#E7D6Cf",
  },
});
