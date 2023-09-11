import { extendTheme } from "@chakra-ui/react";
import Button from "./components/Button";
import Select from "./components/Select";
import { colors } from "./colors";
export const theme = extendTheme({
  components: {
    Button,
    Select,
  },
  styles: {
    global: {
      body: {
        fontFamily: "Roboto",
        fontWeight: 400,
        scrollBehavior: "smooth",
      },
      html: {
        scrollBehavior: "smooth !important",
      },
      "*::placeholder": {
        color: colors.primary_placeholder,
      },
    },
  },
});
