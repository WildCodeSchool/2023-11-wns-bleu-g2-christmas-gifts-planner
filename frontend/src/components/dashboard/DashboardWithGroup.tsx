import { useProfileQuery } from "@/graphql/generated/schema";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import GroupList from "../group/GroupList";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";
import { group } from "console";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function DashboardWhithGroup() {
  const { t } = useTranslation();
  const { currentUser } = useAuthRedirect();
  const [searchGroup, setSearchGroup] = useState("");

  const listOfGroups = [
    ...(currentUser?.profile.groups?.map((group) => ({
      ...group,
      isOwner: true,
    })) ?? []),
    ...(currentUser?.profile.memberGroups?.map((group) => ({
      ...group,
      isOwner: false,
    })) ?? []),
  ];
  const groupCount = listOfGroups.length;
  const filteredGroups = listOfGroups.filter((group) =>
    group.name?.toLowerCase().includes(searchGroup.toLowerCase())
  );
  return (
    <>
      <Text fontSize="lg" mb={6}>
        {groupCount > 1
          ? t("my-groups-list", { groupCount })
          : t("my-group", { groupCount })}{" "}
      </Text>
      <SearchBar
        getter={searchGroup}
        setter={setSearchGroup}
        placeholder="placeholder.search-group"
      />
      {filteredGroups?.map((group) => (
        <Link href={`/group/${group.id}`} key={group.id}>
          <GroupList name={group.name} isOwner={group.isOwner} />
        </Link>
      ))}
    </>
  );
}
