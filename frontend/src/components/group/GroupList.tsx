import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronRight } from "lucide-react";

export default function GroupList({ name }: { name: string }) {
  return (
    <>
      <Box
        m="auto"
        p={4}
        marginTop={4}
        boxShadow="base"
        borderRadius="md"
        _hover={{ boxShadow: "lg" }}
        className="transition ease-in-out delay-120"
      >
        <Flex justifyContent="space-between">
          <Text>{name}</Text>
          <ChevronRight />
        </Flex>
      </Box>
    </>
  );
}
