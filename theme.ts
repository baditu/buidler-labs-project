import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          color: "white",
          bg: "#12372A",
          _hover: {
            bg: "#ADBC9F",
            color: "#436850",
            borderColor: "#ADBC9F",
          },
        },
      },
    },
  },
});
