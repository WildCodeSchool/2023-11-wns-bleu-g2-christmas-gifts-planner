import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { MessagesSquare } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function DashboardWhithoutGroup() {
  const { t } = useTranslation();
  return (
    <>
      <Box m="auto" p={4} boxShadow="base" borderRadius="md">
        <Flex gap={6}>
          <Box alignContent="center">
            <MessagesSquare size={42} strokeWidth={1} color="#830602" />
          </Box>
          <Box display="flex" flexDir="column" gap={3}>
            <Text as="b">{t("no-group")} </Text>
            <Text>
             {t("create-new-group-to-start")}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
