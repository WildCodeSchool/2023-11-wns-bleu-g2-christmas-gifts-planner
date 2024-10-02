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
    color: "primary.highter",
  },
  title: {
    color: "primary.medium",
  },
  icon: {
    color: "primary.medium",
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
  },
  title: {
    color: "tertiary.medium",
  },
  icon: {
    color: "tertiary.medium",
  },
});

export const toastTheme = defineMultiStyleConfig({
  variants: { success: successVariant, error: errorVariant },
});
