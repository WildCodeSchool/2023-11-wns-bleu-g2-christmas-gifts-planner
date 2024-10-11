import { Avatar, Card, Center, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

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
      }}
    >
      <Link href={link}>
        <Center>
          <Avatar size="lg" name={name} mb={4} backgroundColor={color} />
        </Center>
        <Heading size="md" mb={2}>
          {name}
        </Heading>
        <Text fontWeight="bold" mb={2}>
          {role}
        </Text>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </Link>
    </Card>
  );
}
