import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function dashboard() {
  return (
    <>
      <Card align="center" width={{ base: "95%", md: "500px" }} m="auto">
        {/* <Avatar
          size="xl"
          name="firstname lastname"
          bg="#003B1E"
          textColor="white"
        /> */}
        <CardHeader>
          <Avatar size="xl" bg="#003B1E" />
        </CardHeader>

        <Heading size="md">Bienvenue</Heading>
        <Text>
          Il semble que vous n&apos;appartenez à aucun groupe de discussion
        </Text>
        <Text>
          Regoignez un groupe existant ou créez en un nouveau pour commencer à
          échangeer des idées cadeaux avec vos amis !
        </Text>
        <CardFooter>
          <Button variant="greenButton">Créer un groupe</Button>
          <Button variant="greenButton">Rejoindre un groupe</Button>
        </CardFooter>
      </Card>
    </>
  );
}
