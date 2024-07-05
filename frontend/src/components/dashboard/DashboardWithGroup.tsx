import { useProfileQuery } from "@/graphql/generated/schema";
import { Text } from "@chakra-ui/react";
import React from "react";
import GroupList from "../group/GroupList";

export default function DashboardWhithGroup() {
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log("currentUser: ", currentUser);
  return (
    <>
      <Text>Liste de mes groupes - {currentUser?.profile.groups?.length}</Text>
      {currentUser?.profile.groups?.map((group) => (
        <GroupList key={group.id} name={group.name} />
      ))}
    </>
  );
}
