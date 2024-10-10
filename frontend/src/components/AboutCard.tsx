import { Box, Card, CardBody, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutCard({
  icon,
  color,
  step,
  description,
}: {
  icon: any;
  color: string;
  step: string;
  description: string;
}) {
  const { t } = useTranslation();

  return (
    <Card
      m={"auto"}
      maxWidth={{ base: "90%", md: "28rem" }}
      mb={6}
      p={8}
      minH={"14rem"}
      flexDirection={"row"}
      gap={6}
    >
      <Center color={color}>{icon}</Center>
      <CardBody display={"flex"} flexDirection={"column"} p={2}>
        <Heading size="sm" fontFamily="body" mb={6}>
          {t(step)}
        </Heading>
        <Box h={"100%"} alignContent={"center"}>
          <Text fontSize="sm" textAlign={"justify"}>
            {t(description)}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
}
