import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { MessagesSquare } from "lucide-react";
import React from "react";

export default function DashboardWhithoutGroup() {
  return (
    <>
      <Box m="auto" p={4} boxShadow="base" borderRadius="md">
        <Flex gap={6}>
          <Box alignContent="center">
            <MessagesSquare size={42} strokeWidth={1} color="#830602" />
          </Box>
          <Box display="flex" flexDir="column" gap={3}>
            <Text as="b">Vous n&apos;avez aucun groupe de discussion</Text>
            <Text>
              Créez un nouveau groupe pour commencer à échanger des idées
              cadeaux avec vos proches
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
