import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import DashboardWhithoutGroup from "@/components/dashboard/DashbordWithoutGroup";
import { useProfileQuery } from "@/graphql/generated/schema";

export default function Dashboard() {
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log(currentUser);
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
        <DashboardWhithoutGroup />
        <CardFooter>
          <Flex direction="column" gap="1rem">
            <Button variant="greenButton">Créer un groupe</Button>
            <Button variant="greenButton">Rejoindre un groupe</Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}
