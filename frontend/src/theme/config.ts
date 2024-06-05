import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/Button";

export const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
});
