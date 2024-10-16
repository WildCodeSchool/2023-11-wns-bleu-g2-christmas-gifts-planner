import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const defaultMenuItem = defineStyle({
  _hover: {
    background: "secondary.low",
  },
  fontWeight: "bold",
});

export const menuItemTheme = defineStyleConfig({
  variants: { defaultMenuItem },
});
