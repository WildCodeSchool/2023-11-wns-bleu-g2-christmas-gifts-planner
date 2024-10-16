import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const successVariant = definePartsStyle({
  container: {
    borderTopColor: "primary.medium",
    borderTopWidth: "4px",
    background: "white",
    pt: "2",
    _dark: {
      background: "primary.high",
    },
  },
  title: {
    color: "primary.medium",
    _dark: {
      color: "white",
    },
  },
  icon: {
    color: "primary.medium",
    _dark: {
      color: "white",
    },
  },
});
const errorVariant = definePartsStyle({
  container: {
    borderTopColor: "tertiary.medium",
    borderTopWidth: "4px",
    background: "white",
    pt: "2",
    color: "tertiary.highter",
    width: "24rem",
    _dark: {
      background: "tertiary.high",
      color: "white",
    },
  },
  title: {
    color: "tertiary.medium",
    _dark: {
      color: "white",
    },
  },
  icon: {
    color: "tertiary.medium",
    _dark: {
      color: "white",
    },
  },
});

export const toastTheme = defineMultiStyleConfig({
  variants: { success: successVariant, error: errorVariant },
});
