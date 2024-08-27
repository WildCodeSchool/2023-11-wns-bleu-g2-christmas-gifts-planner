import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Box,
  CardBody,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import DashboardWhithoutGroup from "@/components/dashboard/DashboardWithoutGroup";
import { useProfileQuery } from "@/graphql/generated/schema";
import DashboardWhithGroup from "@/components/dashboard/DashboardWithGroup";
import CreateGroupModal from "@/components/group/CreateGroupModal";
import { useTranslation } from "react-i18next";

export default function Dashboard({ pageTitle }: { pageTitle: string }) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  const { t } = useTranslation()
  const { data: currentUser, refetch } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log(currentUser);

  return (
    <>
      {/* <Box> */}
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
          {t("hello")} {currentUser?.profile.firstName}
        </Heading>
        <CardBody w="95%" gap="1rem">
          {currentUser &&
          currentUser?.profile.groups &&
          currentUser.profile.groups.length > 0 ? (
            <DashboardWhithGroup />
          ) : (
            <DashboardWhithoutGroup />
          )}
        </CardBody>
        <CardFooter>
          <Flex direction="column" gap="1rem">
            <CreateGroupModal refetch={refetch} />
          </Flex>
        </CardFooter>
      </Card>
      {/* </Box> */}
    </>
  );
}
