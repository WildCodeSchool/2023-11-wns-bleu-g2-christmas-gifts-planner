import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function AboutUs() {
  return (
    <Box bg={"white"} p={6}>
      <Box m={"auto"} width={"90%"} alignContent={"center"}>
        <Heading mb={6}>A propos</Heading>
        <Text fontSize="sm" textAlign={"justify"}>
          Gifty est une application qui facilite l&apos;organisation des cadeaux
          entre amis et en famille. Ce projet est développé dans le cadre de
          notre apprentissage à la Wild Code School.
        </Text>
      </Box>
    </Box>
  );
}
