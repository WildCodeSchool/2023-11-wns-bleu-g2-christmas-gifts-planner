import { useProfileQuery } from "@/graphql/generated/schema";
import { Text } from "@chakra-ui/react";
import React from "react";
import GroupList from "../group/GroupList";
import Link from "next/link";

export default function DashboardWhithGroup() {
  /**
   * Fetches the current user's profile and groups using the `useProfileQuery` hook.
   * @returns {Object} An object containing the current user's profile and groups.
   */
  const { data: currentUser } = useProfileQuery({
    // Set the error policy to "ignore" to prevent the query from failing
    errorPolicy: "ignore",
  });

  return (
    <>
      <Text fontSize="lg">
        Liste de mes groupes - {currentUser?.profile.groups?.length}
      </Text>
      {currentUser?.profile.groups?.map((group) => (
        <Link href={`/group/${group.id}`} key={group.id}>
          <GroupList name={group.name} />
        </Link>
      ))}
    </>
  );
}
