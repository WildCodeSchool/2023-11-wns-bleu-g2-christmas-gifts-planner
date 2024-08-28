import AddMembersModal from "@/components/group/AddMembersModal";
import { useGroupByIdQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Card,
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export default function Channels() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = router.query?.id as string;
  const [searchMember, setSearchMember] = useState("");
  const { data: groupeId, refetch } = useGroupByIdQuery({
    variables: { groupId: Number(id) },
  });
  console.log("groupeId: ", groupeId);
  const members = groupeId?.groupById.members;
  console.log("members: ", members);
  const filteredMembers = members?.filter(
    (member) =>
      member.firstName?.toLowerCase().includes(searchMember.toLowerCase()) ||
      member.lastName?.toLowerCase().includes(searchMember.toLowerCase())
  );
  console.log("filteredMembers: ", filteredMembers);
  const avatarColors = [
    "primary.medium",
    "secondary.high",
    "tertiary.medium",
    "orange.500",
  ];
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
        <Box textAlign="center" mb="4">
          <Heading size="lg" my={4}>
            {groupeId?.groupById.name || t("group-name")}
          </Heading>
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
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Member"
              borderRadius="full"
              bg="transparent"
              border="1px solid #084F2D"
              size={"lg"}
              _hover={{
                textDecoration: "none",
                bg: "secondary.medium",
              }}
            />
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
                   {t("present-ideas")}{" "}
                    {member.firstName + " " + member.lastName}
                  </Text>
                </Box>
              </Flex>
            </Card>
          ))}
        </Box>
      </Box>
      <AddMembersModal refetch={refetch} id={id} />
    </>
  );
}
