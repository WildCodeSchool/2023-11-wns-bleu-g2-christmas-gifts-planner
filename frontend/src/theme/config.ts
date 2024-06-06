import {extendTheme } from "@chakra-ui/react";


import '@fontsource/amatic-sc';
import '@fontsource/open-sans';

const colors = {
  primary: {
    lowest: "#ECFFF5",
    lower: "#D2FFEC",
    low: "#65FFBE",
    medium: "#00F97B",
    high: "#00A250",
    highter: "#004F2D",
    hightest: "#003B1E",
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
  background: {
    default: "#FFFEF9",
  },
};



export const theme = extendTheme( { 
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
});
