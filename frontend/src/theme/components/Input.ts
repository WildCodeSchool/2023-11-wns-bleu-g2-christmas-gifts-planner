import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const goldenInput = defineStyle({
  focusBorderColor: "secondary.medium",
  borderColor: "secondary.low",
  rounded: 50,
  _hover: {
    borderColor: "secondary.medium",
  },
});

export const inputTheme = defineStyleConfig({
  variants: { goldenInput },
});
