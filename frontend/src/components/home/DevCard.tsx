import { Avatar, Card, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function DevCard({
  name,
  link,
  color,
  role,
  description,
}: {
  name: string;
  link: string;
  color: string;
  role: string;
  description: string;
}) {
  const { t } = useTranslation();

  return (
    <Card
      key={name}
      maxWidth="15rem"
      p={4}
      textAlign="center"
      transition={"all 0.3 ease"}
      _hover={{
        boxShadow: "2xl",
        transform: "translateY(-2px)",
        backgroundColor: "whiteAlpha.600",
        _dark: { backgroundColor: "dark.surface20" },
      }}
    >
      <Link href={link}>
        <Center>
          <Avatar size="lg" name={name} mb={4} backgroundColor={color} />
        </Center>
        <Heading size="md" mb={2}>
          {t(name)}
        </Heading>
        <Text fontWeight="bold" mb={2}>
          {t(role)}
        </Text>
        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.200" }}>
          {t(description)}
        </Text>
      </Link>
    </Card>
  );
}
