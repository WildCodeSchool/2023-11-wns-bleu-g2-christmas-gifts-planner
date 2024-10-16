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
      bg: "white",
    },
    _invalid: {
      borderColor: "tertiary.medium",
    },
    _placeholder: {
      fontSize: "sm",
    },
    _dark: {
      _focusVisible: {
        bg: "dark.surface20",
      },
      _invalid: {
        borderColor: "tertiary.lower",
      },
    },
  },
});
const genericInput = definePartsStyle({
  field: {
    border: "1px solid",
    borderColor: "generic.low",
    rounded: 50,
    bg: "inherit",
    _hover: {
      borderColor: "generic.high",
    },
    _focusVisible: {
      border: "2px solid",
      borderColor: "generic.medium",
      bg: "white",
    },
    _invalid: {
      borderColor: "tertiary.medium",
    },
    _placeholder: {
      fontSize: "sm",
    },
    _dark: {
      _focusVisible: {
        bg: "dark.surface20",
      },
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { goldenInput, genericInput },
});
