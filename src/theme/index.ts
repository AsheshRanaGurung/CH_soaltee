import { extendTheme } from "@chakra-ui/react";
import Button from "./components/Button";
export const theme = extendTheme({
  components: {
    Button,
  },
  styles: {
    global: {
      body: {
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 400,
        scrollBehavior: "smooth",
      },
      html: {
        scrollBehavior: "smooth !important",
      },
    },
  },
});
