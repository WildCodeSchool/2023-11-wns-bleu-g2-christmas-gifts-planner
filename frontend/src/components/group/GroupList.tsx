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
        marginTop={4}
        boxShadow="base"
        borderRadius="md"
        _hover={{
          boxShadow: "lg",
          border: "0.03rem solid",
          borderColor: "primary.lowest",
        }}
        className="transition ease-in-out delay-120"
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
