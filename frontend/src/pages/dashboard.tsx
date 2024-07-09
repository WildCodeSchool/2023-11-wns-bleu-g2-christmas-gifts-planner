import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import DashboardWhithoutGroup from "@/components/dashboard/DashboardWithoutGroup";
import { useProfileQuery } from "@/graphql/generated/schema";
import DashboardWhithGroup from "@/components/dashboard/DashboardWithGroup";
import CreateGroupModal from "@/components/group/CreateGroupModal";

export default function Dashboard() {
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
  return (
    <>
      <Card
        align="center"
        width={{ base: "95%", md: "48rem" }}
        m="auto"
        h="100%"
        paddingBlock="1rem"
        marginBlock="1rem"
        bg="secondary.lowest"
      >
        {/* <Avatar
          size="xl"
          name="firstname lastname"
          bg="#003B1E"
          textColor="white"
        /> */}
        <CardHeader alignContent="center">
          <Avatar
            size="xl"
            bg="#003B1E"
            name={currentUser?.profile.firstName}
          />
        </CardHeader>
        <Heading size="md" marginBlock="1rem">
          Bonjour {currentUser?.profile.firstName}
        </Heading>
        {currentUser &&
        currentUser?.profile.groups &&
        currentUser.profile.groups.length > 0 ? (
          <DashboardWhithGroup />
        ) : (
          <DashboardWhithoutGroup />
        )}
        <CardFooter>
          <Flex direction="column" gap="1rem">
            <CreateGroupModal />
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}
