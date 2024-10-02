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
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export default function Channels() {
  const router = useRouter();
  const { t } = useTranslation();
  const id = router.query?.id as string;
  const [searchMember, setSearchMember] = useState("");
  const [isMobile] = useMediaQuery("(max-width: 768px)");
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
        height={isMobile ? "690px": "780px"}
        boxShadow={"0px -2px #00000025"}
        borderRadius={"xl"}
        overflowY="auto" // Permet le défilement vertical
        maxHeight={isMobile ? "690px" : "780px"}
      >
        <Box textAlign="center" mb="4">
          <Heading size="lg" my={4}>
            {groupeId?.groupById.name || t("group-name")}
          </Heading>
        </Box>
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
        <Box  justifyContent={'center'}>
          {filteredMembers?.map((member, index) => (
            <Card
              className="items-center"
              key={member.id}
              align="center"
              width={{ base: "95%", md: "48rem" }}
              m="auto"
              h={ isMobile? "190px": "315px"}
              // paddingBlock="1rem"
              marginBlock="3rem"
              bg="white"
              boxShadow={"lg"}
              borderRadius={"lg"}
              position={"relative"}
            >
              <Flex justify={"center"} width={'fit-content'} mb={16}>
                <Avatar
                  size="lg"
                  name={member.firstName + " " + member.lastName}
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
                    {member.firstName + " " + member.lastName}
                  </Text>
                </Box>
              </Flex>
              <Flex align="end" pr={2}>
                <Box>
                  <Text
                    size="sm"
                    flexWrap="wrap"
                    color={"primary.medium"}
                  >
                    {member.email}
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
