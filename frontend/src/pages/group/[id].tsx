import AddMembersModal from "@/components/group/AddMembersModal";
import {
  useChangeGroupNameMutation,
  useGroupByIdQuery,
  useProfileQuery,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { X, Check, Pen, SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGroupContext } from "@/contexts/GroupContext";

export default function Channels() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = router.query?.id as string;
  const { data: groupId, refetch } = useGroupByIdQuery({
    variables: { groupId: Number(id) },
  });
  const [searchMember, setSearchMember] = useState("");
  const [editingGroupName, setEditingGroupName] = useState(false);
  const [ChangeGroupName] = useChangeGroupNameMutation();
  const [groupName, setGroupName] = useState("");
  const { setGroupData } = useGroupContext();
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
  const isOwner = groupId?.groupById.owner.id === currentUser?.profile.id;

  useEffect(() => {
    if (groupId?.groupById) {
      setGroupName(groupId.groupById.name);
    }
  }, [groupId]);

  const members = groupId?.groupById.members;
  const filteredMembers = members?.filter(
    (member) =>
      member.firstName?.toLowerCase().includes(searchMember.toLowerCase()) ||
      member.lastName?.toLowerCase().includes(searchMember.toLowerCase())
  );
  const avatarColors = [
    "primary.medium",
    "secondary.high",
    "tertiary.medium",
    "orange.500",
  ];
  const handleEdit = () => {
    setEditingGroupName(!editingGroupName);
  };
  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };
  const updateGroupName = async () => {
    try {
      await ChangeGroupName({
        variables: { groupId: Number(id), data: { name: groupName || "" } },
      });
      setEditingGroupName(!editingGroupName);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  if (groupId?.groupById.owner.id !== undefined) {
    setGroupData(id, groupId.groupById.owner.id, groupName);
  }
  return (
    <>
      <Box
        p="4"
        mx="2"
        bg={"white"}
        height={"full"}
        boxShadow={"0px -2px #00000025"}
        borderRadius={"xl"}
      >
        <Box
          mb="4"
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          gap={4}
        >
          {editingGroupName && isOwner ? (
            <Heading size="lg" my={4}>
              <Input
                value={groupName}
                onChange={handleChangeGroupName}
                fontFamily={"heading"}
                fontSize={"30px"}
                width="auto"
                variant="genericInput"
              />
            </Heading>
          ) : (
            <Heading size="lg" my={4}>
              {groupId?.groupById.name || t("group-name")}
            </Heading>
          )}
          {isOwner && (
            <Box>
              {editingGroupName ? (
                <Box display={"flex"}>
                  <Box
                    as="button"
                    className="genericButton"
                    onClick={() => groupId && updateGroupName()}
                  >
                    <Check />
                  </Box>
                  <Box
                    as="button"
                    className="genericButton"
                    onClick={() => groupId && handleEdit()}
                  >
                    <X />
                  </Box>
                </Box>
              ) : (
                <Box
                  as="button"
                  className="genericButton"
                  onClick={() => groupId && handleEdit()}
                >
                  <Pen />
                </Box>
              )}
            </Box>
          )}
        </Box>
        <Flex justifyContent="center" my={8}>
          <Stack direction="row" spacing={4}>
            {members?.map((member, index) => (
              <Avatar
                key={member.id}
                name={member.firstName + " " + member.lastName}
                bg={avatarColors[index % avatarColors.length]}
                color="white"
              />
            ))}
            <AddMembersModal refetch={refetch} id={id} />
          </Stack>
        </Flex>
        <InputGroup
          my={8}
          width={{ base: "95%", md: "48rem" }}
          m="auto"
          bg="white"
          border="1px"
          borderColor="gray.300"
          borderRadius="full"
          height="50px"
          boxShadow="2px 2px #00000025"
        >
          <InputLeftElement pointerEvents="none" height="full">
            <SearchIcon color="primary.medium" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={t("placeholder-find-thread")}
            height="full"
            borderRadius="full"
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
          />
        </InputGroup>
        <Box my={8}>
          {filteredMembers?.map((member, index) => (
            <Link
              key={member.id}
              href={`/group/${groupId?.groupById.id}/channel/${member.id}`}
            >
              <Card
                className="items-start pl-8"
                key={member.id}
                align="center"
                width={{ base: "95%", md: "48rem" }}
                m="auto"
                h="100%"
                paddingBlock="1rem"
                marginBlock="1rem"
                bg="secondary.lowest"
                boxShadow={"lg"}
                borderRadius={"lg"}
              >
                <Flex align="center" pr={2}>
                  <Avatar
                    name={member.firstName + " " + member.lastName}
                    bg={avatarColors[index % avatarColors.length]}
                    color="white"
                    mr="4"
                  />
                  <Box>
                    <Text
                      as="b"
                      size="md"
                      flexWrap="wrap"
                      color={"primary.medium"}
                    >
                      Idées cadeaux pour{" "}
                      {member.firstName + " " + member.lastName}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}
