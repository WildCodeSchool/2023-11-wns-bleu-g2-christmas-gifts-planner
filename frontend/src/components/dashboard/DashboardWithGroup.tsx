import { useProfileQuery } from "@/graphql/generated/schema";
import { CardBody, Text } from "@chakra-ui/react";
import React from "react";
import GroupList from "../group/GroupList";

export default function DashboardWhithGroup() {
  /**
   * Fetches the current user's profile and groups using the `useProfileQuery` hook.
   * @returns {Object} An object containing the current user's profile and groups.
   */
  const { data: currentUser } = useProfileQuery({
    // Set the error policy to "ignore" to prevent the query from failing
    errorPolicy: "ignore",
  });
  console.log("data: ", currentUser);
  return (
    <>
      <Text fontSize="lg">
        Liste de mes groupes - {currentUser?.profile.groups?.length}
      </Text>
      {currentUser?.profile.groups?.map((group) => (
        <GroupList key={group.id} name={group.name} />
      ))}
    </>
  );
}
