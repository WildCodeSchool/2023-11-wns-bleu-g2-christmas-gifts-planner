import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  CardBody,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import DashboardWhithoutGroup from "@/components/dashboard/DashboardWithoutGroup";
import { useProfileQuery } from "@/graphql/generated/schema";
import DashboardWhithGroup from "@/components/dashboard/DashboardWithGroup";
import CreateGroupModal from "@/components/group/CreateGroupModal";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import UnauthorizedImage from "../assets/images/Unauthorized.png";
import GenericError from "../assets/images/GenericError.png";
import { useTranslation } from "react-i18next";
import { useErrorContext } from "@/contexts/ErrorContext";

export default function Dashboard({ pageTitle }: { pageTitle: string }) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
  const { t } = useTranslation();
  const {
    data: currentUser,
    refetch,
    loading,
    error,
  } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const { messages } = useErrorContext();

  if (loading) return <Loader></Loader>;
  if (error) {
    <Error
      image={GenericError}
      alt="generic error"
      message={messages.generic}
    ></Error>;
  }
  if (!currentUser)
    return (
      <Error
        image={UnauthorizedImage}
        alt="unauthorized error"
        message={messages.unauthorized}
      ></Error>
    );

  return (
    <>
      <Card
        align="center"
        width={{ base: "95%", md: "48rem" }}
        m="auto"
        h="100%"
        paddingBlock={4}
        marginBlock={4}
      >
        <CardHeader alignContent="center">
          <Avatar
            size="lg"
            bg="primary.high"
            name={currentUser?.profile.firstName ?? ""}
          />
        </CardHeader>
        <Heading as="h1" size="xl" marginBlock={4}>
          {t("hello")} {currentUser?.profile.firstName}
        </Heading>
        <CardBody w="95%" gap={4}>
          {(currentUser?.profile.groups &&
            currentUser.profile.groups.length > 0) ||
          (currentUser?.profile.memberGroups &&
            currentUser.profile.memberGroups.length > 0) ? (
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
