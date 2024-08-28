import { useProfileQuery } from "@/graphql/generated/schema";
import { Text } from "@chakra-ui/react";
import React from "react";
import GroupList from "../group/GroupList";
import Link from "next/link";

export default function DashboardWhithGroup() {
  // Fetches the current user's profile and groups
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const listOfGroups = {
    groups: currentUser?.profile.groups,
    memberOf: currentUser?.profile.memberGroups,
  };
  const numberOfGroups =
    (listOfGroups.groups?.length ?? 0) + (listOfGroups.memberOf?.length ?? 0);

  return (
    <>
      <Text fontSize="lg" mb={6}>
        Vous êtes membre de {numberOfGroups}{" "}
        {numberOfGroups > 1 ? "groupes" : "groupe"}
      </Text>
      {listOfGroups.groups?.map((group) => (
        <Link href={`/group/${group.id}`} key={group.id}>
          <GroupList name={group.name} isOwner={true} />
        </Link>
      ))}
      {listOfGroups.memberOf?.map((group) => (
        <Link href={`/group/${group.id}`} key={group.id}>
          <GroupList name={group.name} isOwner={false} />
        </Link>
      ))}
    </>
  );
}
