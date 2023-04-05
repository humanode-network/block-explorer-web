import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  colors: {
    brand: {
      100: "rgb(253, 131, 69)",
      900: "rgb(224, 52, 48)",
    },
    // brand: baseTheme.colors.red,
  },
  styles: {
    global: {
      body: {
        bg: "rgb(25 25 25)",
      },
      a: {
        color: "brand.100",
      },
    },
  },
});

export default theme;
