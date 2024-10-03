import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/Button";
import { menuItemTheme } from "./components/MenuItem";
import "@fontsource/amatic-sc";
import "@fontsource/open-sans";
import { buttonTheme } from "./components/Button";
import { formTheme } from "./components/Form";
import { inputTheme } from "./components/Input";
import { formTheme } from "./components/Form";
import { toastTheme } from "./components/Toast";

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
    lowest: "#FAF8EC",
    lower: "#F4EDCD",
    low: "#E0BF64",
    medium: "#CC952E",
    high: "#AA7124",
    highter: "#885220",
    hightest: "#724421",
  },
  tertiary: {
    lowest: "#FEBBB8",
    lower: "#FD7B77",
    low: "#CE231D",
    medium: "#A10702",
    high: "#830602",
    highter: "#600401",
    hightest: "#410301",
  },
  generic: {
    low: "#f0f0f0",
    medium: "#c0c0c0",
    high: "#787878",
  },
  background: {
    default: "#F9F6F1",
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
    Alert: toastTheme,
  },
});
