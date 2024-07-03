import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const goldenButton = defineStyle({
  background: "secondary.medium",
  border: "1px",
  borderColor: "secondary.medium",
  _hover: {
    background: "secondary.lower",
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
  background: "#003B1E",
  color: "white",
  _hover: {
    background: "#003B1E",
    opacity: 0.7,
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: 50,
    boxShadow: "md",
    color: "black",
  },
  variants: { goldenButton, greenButton, goldenOutline },
  defaultProps: {
    size: "sm",
  },
});
