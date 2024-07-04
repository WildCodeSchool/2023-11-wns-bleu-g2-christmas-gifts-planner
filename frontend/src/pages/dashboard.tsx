import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import DashboardWhithoutGroup from "@/components/dashboard/DashboardWithoutGroup";
import { useProfileQuery, useUsersQuery } from "@/graphql/generated/schema";
import DashboardWhithGroup from "@/components/dashboard/DashboardWithGroup";
import { GetServerSideProps } from "next";

export default function Dashboard({pageTitle}: {pageTitle: string}) {

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log(currentUser);
  const { data: users } = useUsersQuery();
  // console.log(users);
  return (
    <>
      <Card
        align="center"
        width={{ base: "95%", md: "48rem" }}
        m="auto"
        h="100dvh"
        paddingBlock="1rem"
        marginBlock="1rem"
      >
        {/* <Avatar
          size="xl"
          name="firstname lastname"
          bg="#003B1E"
          textColor="white"
        /> */}
        <CardHeader>
          <Avatar size="xl" bg="#003B1E" />
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
            <Button variant="goldenButton">Créer un groupe</Button>
            <Button variant="goldenButton">Rejoindre un groupe</Button>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      pageTitle: "Mes groupes",
    },
  };
};