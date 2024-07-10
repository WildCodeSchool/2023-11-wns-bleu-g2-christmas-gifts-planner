import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const defaultMenuItem = defineStyle({
  _hover: {
    background: "secondary.low",
  },
  color: "primary.high",
  fontWeight: "bold",
});

export const menuItemTheme = defineStyleConfig({
  variants: { defaultMenuItem },
});
