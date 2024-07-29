import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Box,
  CardBody,
  Spinner,
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

  const {
    data: currentUser,
    refetch,
    loading,
  } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log(currentUser);

  if (loading) {
    return (
      <>
        <Card
          align="center"
          width={{ base: "90%", md: "48rem" }}
          m="auto"
          h="100dvh"
          paddingBlock={4}
          marginBlock={4}
          bg="secondary.lowest"
        >
          <CardBody w="95%" gap={4}>
            <Spinner
              speed="0.7s"
              size="xl"
              color="secondary.medium"
              emptyColor="tertiary.lowest"
            />
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card
        align="center"
        width={{ base: "95%", md: "48rem" }}
        m="auto"
        h="100%"
        paddingBlock={4}
        marginBlock={4}
        bg="secondary.lowest"
      >
        <CardHeader alignContent="center">
          <Avatar
            size="lg"
            bg="primary.high"
            name={currentUser?.profile.firstName}
          />
        </CardHeader>
        <Heading as="h1" size="xl" marginBlock={4}>
          Bonjour {currentUser?.profile.firstName}
        </Heading>
        <CardBody w="95%" gap={4}>
          {currentUser &&
          currentUser?.profile.groups &&
          currentUser.profile.groups.length > 0 ? (
            <DashboardWhithGroup />
          ) : (
            <DashboardWhithoutGroup />
          )}
        </CardBody>
        <CardFooter>
          <Flex direction="column" gap={4}>
            <CreateGroupModal refetch={refetch} />
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}
