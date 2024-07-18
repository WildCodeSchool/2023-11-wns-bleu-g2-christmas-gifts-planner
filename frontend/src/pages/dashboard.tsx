import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import DashboardWhithoutGroup from "@/components/dashboard/DashboardWithoutGroup";
import { useProfileQuery } from "@/graphql/generated/schema";
import DashboardWhithGroup from "@/components/dashboard/DashboardWithGroup";
import CreateGroupModal from "@/components/group/CreateGroupModal";

export default function Dashboard({ pageTitle }: { pageTitle: string }) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const { data: currentUser, refetch } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log(currentUser);
  
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
        <CardHeader alignContent="center">
          <Avatar
            size="xl"
            bg="primary.high"
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
            <CreateGroupModal refetch={refetch} />
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}
