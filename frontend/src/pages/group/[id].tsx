import AddMembersModal from "@/components/group/AddMembersModal";
import {
  useChangeGroupNameMutation,
  useGroupByIdQuery,
  useProfileQuery,
  useChannelsQuery,
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
  useMediaQuery,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { X, Check, Pen, SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGroupContext } from "@/contexts/GroupContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ApolloError } from "@apollo/client";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Channels() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = router.query?.id as string;
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { data: groupId, refetch } = useGroupByIdQuery({
    variables: { groupId: Number(id) },
  });
  const { data: channels } = useChannelsQuery({
    variables: { groupId: Number(id) },
  });
  console.log("channels: ", channels);
  const [searchMember, setSearchMember] = useState("");
  const [editingGroupName, setEditingGroupName] = useState(false);
  const [ChangeGroupName] = useChangeGroupNameMutation();
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
  const { setGroupData } = useGroupContext();
  const { validateGroupName } = useFormValidation();
  const { currentUser } = useAuthRedirect();
  const isOwner = groupId?.groupById.owner.id === currentUser?.profile.id;

  useEffect(() => {
    if (groupId?.groupById) {
      setGroupName(groupId.groupById.name);
    }
  }, [groupId]);

  const filteredMembers = channels?.channels.filter(
    (member) =>
      member.receiver.firstName?.toLowerCase().includes(searchMember.toLowerCase()) ||
      member.receiver.lastName?.toLowerCase().includes(searchMember.toLowerCase())
  );
  const avatarColors = [
    "primary.medium",
    "secondary.high",
    "tertiary.medium",
    "orange.500",
  ];
  const handleEdit = () => {
    setEditingGroupName(!editingGroupName);
    setError("");
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
      setError("");
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("GraphQL Error:", error.graphQLErrors);
        handleError(error);
      } else {
        console.error(error);
      }
    }
  };
  if (groupId?.groupById.owner.id !== undefined) {
    setGroupData(id, groupId.groupById.owner.id, groupName);
  }

  const handleError = (error: ApolloError) => {
    const newErrors: (string | string[])[] = [];
    error.graphQLErrors.forEach((err) => {
      if (err.message.includes("Argument Validation Error")) {
        newErrors.push(validateGroupName(groupName));
      } else if (
        err.message.includes("A group with this name already exists for you")
      ) {
        const descriptionError = t("validate-data.group-name", { groupName });
        newErrors.push(descriptionError);
      } else {
        const descriptionError = t("toast.error.generic-description");
        newErrors.push(descriptionError);
      }
    });
    setError(newErrors.join(", "));
  };
  return (
    <>
      <Box
        p="4"
        mx="2"
        bg={"white"}
        height={isMobile ? "690px" : "780px"}
        boxShadow={"0px -2px #00000025"}
        borderRadius={"xl"}
        overflowY="auto"
        maxHeight={isMobile ? "690px" : "780px"}
      >
        <Box
          mb="4"
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          gap={4}
        >
          {isOwner ? (
            editingGroupName ? (
              <Box>
                <FormControl mt={3} isInvalid={!!error}>
                  <Box display={"flex"}>
                    <Input
                      value={groupName}
                      onChange={handleChangeGroupName}
                      fontFamily={"heading"}
                      fontSize={"30px"}
                      variant="genericInput"
                    />

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
                  <FormErrorMessage color="tertiary.medium">
                    {error}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            ) : (
              <Heading size="lg" my={4}>
                {groupId?.groupById.name}
                <Box
                  as="button"
                  className="genericButton"
                  onClick={() => groupId && handleEdit()}
                >
                  <Pen size={18} />
                </Box>
              </Heading>
            )
          ) : (
            <Heading size="lg" my={4}>
              {groupId?.groupById.name}
            </Heading>
          )}
        </Box>
        <Flex justifyContent="center" my={8}>
          <Stack direction="row" spacing={4}>
            {channels?.channels?.map((channel, index) => (
              <Avatar
                key={channel.id}
                name={channel.receiver.firstName + " " + channel.receiver.lastName}
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
        <Box justifyContent={"center"}>
          {filteredMembers?.map((member, index) => (
            <Link
              key={member.id}
              href={`/group/${groupId?.groupById.id}/channel/${member.id}`}
            >
              <Card
                className="items-center"
                key={member.id}
                align="center"
                width={{ base: "95%", md: "48rem" }}
                m="auto"
                h={isMobile ? "190px" : "315px"}
                marginBlock="3rem"
                bg="white"
                boxShadow={"lg"}
                borderRadius={"lg"}
                position={"relative"}
              >
                <Flex justify={"center"} width={"fit-content"} mb={16}>
                  <Avatar
                    size="lg"
                    name={member.receiver.firstName + " " + member.receiver.lastName}
                    bg={avatarColors[index % avatarColors.length]}
                    color="white"
                    mr="4"
                    position="absolute"
                    top="-10%"
                    left="50%"
                    transform="translateX(-50%)"
                  />
                </Flex>
                <Flex align="center" pr={2} mb={16}>
                  <Box>
                    <Text
                      as="b"
                      size="md"
                      flexWrap="wrap"
                      color={"primary.medium"}
                    >
                      {t("present-ideas")}{" "}
                      {member.receiver.firstName + " " + member.receiver.lastName}
                    </Text>
                  </Box>
                </Flex>
                <Flex align="end" pr={2}>
                  <Box>
                    <Text size="sm" flexWrap="wrap" color={"primary.medium"}>
                      {member.receiver.email}
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
