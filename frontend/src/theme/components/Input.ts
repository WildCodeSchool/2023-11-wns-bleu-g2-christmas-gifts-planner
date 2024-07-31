import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const goldenInput = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "secondary.low",
    rounded: 50,
    bg: "inherit",
    _hover: {
      borderColor: "secondary.high",
    },
    _focusVisible: {
      border: "2px solid",
      borderColor: "secondary.medium",
      bg: "background.default",
    },
    _invalid: {
      borderColor: "tertiary.medium",
    },
    _placeholder: {
      fontSize: "sm",
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { goldenInput },
});
