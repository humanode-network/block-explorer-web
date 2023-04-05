import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bg: "rgb(25 25 25)",
      },
    },
  },
});

export default theme;
