import { formErrorAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleText = defineStyle({
  color: "tertiary.medium",
  _dark: {
    color: "tertiary.lower",
  },
});

const baseStyle = definePartsStyle({
  text: baseStyleText,
});

export const formErrorTheme = defineMultiStyleConfig({
  baseStyle,
});
