import { MenuItem, extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/Button";
import { menuItemTheme } from "./components/MenuItem";
import "@fontsource/amatic-sc";
import "@fontsource/open-sans";
import { inputTheme } from "./components/Input";
import { formTheme } from "./components/Form";

const colors = {
  primary: {
    lowest: "#487F64",
    lower: "#317D58",
    low: "#11643C",
    medium: "#084F2D",
    high: "#003B1E",
    highter: "#042515",
    hightest: "#03110A",
  },
  secondary: {
    lowest: "#FFFEF9",
    lower: "#F4EDCD",
    low: "#E0BF64",
    medium: "#CC952E",
    high: "#885220",
    highter: "#623921",
    hightest: "#381D10",
  },
  tertiary: {
    medium: "#A10702",
  },
  background: {
    default: "#F4EDCD",
  },
};

export const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Amatic Sc', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "background.default",
      },
    },
  },
  components: {
    Button: buttonTheme,
    MenuItem: menuItemTheme,
    Input: inputTheme,
    Form: formTheme,
  },
});
