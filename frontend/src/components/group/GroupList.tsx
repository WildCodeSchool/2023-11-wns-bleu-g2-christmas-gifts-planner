import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ChevronRight, Crown } from "lucide-react";

export default function GroupList({
  name,
  isOwner = false,
}: {
  name: string;
  isOwner: boolean;
}) {
  return (
    <>
      <Box
        m="auto"
        p={4}
        marginTop={6}
        boxShadow="base"
        borderRadius="md"
        transition={
          "box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-in-out"
        }
        _hover={{
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "0.03rem solid",
          borderColor: "primary.lowest",
          transform: "translateY(-2px)",
        }}
      >
        <Flex justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={3}>
            <Text>{name}</Text>
            {isOwner && <Crown size={16} color="#CC952E" />}
          </Box>
          <ChevronRight />
        </Flex>
      </Box>
    </>
  );
}
