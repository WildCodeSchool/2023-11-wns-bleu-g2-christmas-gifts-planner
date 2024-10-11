import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const goldenButton = defineStyle({
  background: "secondary.medium",
  _hover: {
    background: "secondary.high",
  },
});

const whiteGoldenButton = defineStyle({
  background: "white",

  _hover: {
    background: "secondary.medium",
    color: "black",
  },
});

const greenButton = defineStyle({
  background: "primary.high",
  color: "white",
  _hover: {
    background: "primary.lower",
  },
});

const whiteGreenButton = defineStyle({
  background: "white",
  _hover: {
    background: "primary.lower",
    color: "white",
  },
});

const redButton = defineStyle({
  background: "tertiary.medium",
  color: "white",
  _hover: {
    background: "tertiary.lowest",
    color: "black",
  },
});
const whiteRedButton = defineStyle({
  background: "white",
  _hover: {
    background: "tertiary.lowest",
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
    whiteGoldenButton,
    greenButton,
    whiteGreenButton,
    redButton,
    whiteRedButton,
    transparentButton,
    deleteButton,
  },
  defaultProps: {
    size: "sm",
  },
});
