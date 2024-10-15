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
  Text,
  useMediaQuery,
  FormControl,
  FormErrorMessage,
  Grid,
} from "@chakra-ui/react";
import { X, Check, Pen, SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGroupContext } from "@/contexts/GroupContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ApolloError } from "@apollo/client";
import SearchBar from "@/components/SearchBar";

export default function Channels() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = router.query?.id as string;
  const [isMobile] = useMediaQuery("(max-width: 500px)");
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
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
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
        p={isMobile ? "4" : "32"}
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
              <Heading as={"h1"} size="xl" my={4}>
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
            <Heading size="xl" my={4}>
              {groupId?.groupById.name}
            </Heading>
          )}
        </Box>
        <SearchBar
          getter={searchMember}
          setter={setSearchMember}
          placeholder="placeholder-find-thread"
        />        
        <Flex justifyContent="center" my={16}>
          {isOwner && <AddMembersModal refetch={refetch} id={id} />}        
        </Flex>

        <Grid
          templateColumns={{
            base: "1fr",  
            sm: "repeat(auto-fit, minmax(280px, 1fr))",  
          }}
          gap={isMobile? 8: 32}
          justifyItems="center"
        >
        {filteredMembers?.map((member, index) => (
          <Link
            key={member.id}
            href={`/group/${groupId?.groupById.id}/channel/${member.id}`}
          >
            <Card
            justify={"center"}
            align={"center"}
              bg="white"
              borderRadius="lg"
              p={4}
              boxShadow="md"
              textAlign="center"
              transition="transform 0.2s ease"
              _hover={{ transform: "scale(1.05)" }}
              maxW="100%"  
              minW={isMobile ? "330px" : "380px"}
              minH="250px"  
              h="full"  
            >
              <Avatar
                size="xl"
                name={member.receiver.firstName + " " + member.receiver.lastName}
                bg={avatarColors[index % avatarColors.length]}
                color={"white"}
                mb={4}
              />
              <Text fontWeight="bold" color="primary.medium" fontSize="lg">
                {t("present-ideas")} {member.receiver.firstName + " " + member.receiver.lastName}
              </Text>
              <Text color="gray.500">{member.receiver.email}</Text>
            </Card>
          </Link>
        ))}
      </Grid>
      </Box>
    </>
  );
}
