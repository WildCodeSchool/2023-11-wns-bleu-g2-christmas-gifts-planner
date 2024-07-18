import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const goldenButton = defineStyle({
  background: "secondary.medium",
  _hover: {
    background: "secondary.high",
  },
});
const goldenOutline = defineStyle({
  background: "secondary.lower",
  border: "1px",
  borderColor: "secondary.medium",
  _hover: {
    background: "secondary.medium",
  },
});
const greenButton = defineStyle({
  background: "primary.high",
  color: "white",
  _hover: {
    background: "primary.lower",
  },
});

const transparentButton = defineStyle({
  background: "#00000000",
  border: "1px solid secondary.medium",
  color: "black",
  _hover: {
    background: "#primary.high",
    opacity: 0.7,
  },
});

const cancelButton = defineStyle({
  background: "white",
  color: "tertiary.hightest",
  _hover: {
    background: "tertiary.lowest",
  },
});

const deleteButton = defineStyle({
  background: "red.600",
  color: "white",
  _hover: {
    background: "tertiary.lowest",
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 50,
    boxShadow: "md",
    color: "black",
  },
  variants: {
    goldenButton,
    greenButton,
    goldenOutline,
    transparentButton,
    cancelButton,
    deleteButton
  },
  defaultProps: {
    size: "sm",
  },
});
