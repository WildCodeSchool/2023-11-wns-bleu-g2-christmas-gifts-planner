import {
  background,
  border,
  Card,
  extendTheme,
  FormErrorMessage,
  type ThemeConfig,
} from "@chakra-ui/react";
import { menuItemTheme } from "./components/MenuItem";
import "@fontsource/amatic-sc";
import "@fontsource/open-sans";
import { buttonTheme } from "./components/Button";
import { inputTheme } from "./components/Input";
import { formTheme } from "./components/Form";
import { toastTheme } from "./components/Toast";
import { cardTheme } from "./components/Card";
import { formErrorTheme } from "./components/FormError";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

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
    dark: "#121714",
    darkCard: "#282828",
  },
  dark: {
    background: "#121714",
    surface10: "#282828",
    surface20: "#3f3f3f",
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `'Amatic Sc', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  // styles: {
  //   global: {
  //     "html, body": {
  //       backgroundColor: "background.default" ,

  //     },
  //   },
  // },
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg:
          props.colorMode === "dark" ? "background.dark" : "background.default",
      },
    }),
  },
  components: {
    Button: buttonTheme,
    MenuItem: menuItemTheme,
    Input: inputTheme,
    Form: formTheme,
    FormError: formErrorTheme,
    Alert: toastTheme,
    Card: cardTheme,
  },
});
