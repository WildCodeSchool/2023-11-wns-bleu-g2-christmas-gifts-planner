import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const goldenButton = defineStyle({
  background: "#CC952E",
  _hover: {
    background: "#CC952E",
    opacity: 0.7,
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
  },
  variants: { goldenButton, greenButton },
  defaultProps: {
    size: "sm",
  },
});
