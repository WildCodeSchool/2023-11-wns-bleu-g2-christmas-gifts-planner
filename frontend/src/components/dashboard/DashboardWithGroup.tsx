import { useProfileQuery } from "@/graphql/generated/schema";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import GroupList from "../group/GroupList";
import { useRouter } from "next/router";

export default function DashboardWhithGroup() {
  const router = useRouter();

  // Fetches the current user's profile and groups
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });

  // Function to handle clicking on a group
  const handleGroupClick = (groupId: number) => {
    // Navigate to the channels page for the clicked group
    router.push(`/groups/${groupId}`);
  };

  return (
    <>
      <Text>Liste de mes groupes - {currentUser?.profile.groups?.length}</Text>
      {currentUser?.profile.groups?.map((group) => (
        <Box 
          key={group.id} 
          onClick={() => handleGroupClick(group.id)} 
          cursor="pointer"
        >
          <GroupList 
            name={group.name} 
          />
        </Box>
      ))}
    </>
  );
}
