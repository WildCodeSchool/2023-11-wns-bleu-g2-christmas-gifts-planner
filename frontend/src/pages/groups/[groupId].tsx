import { useState } from "react";
import { useProfileQuery, useGetGroupDetailsQuery } from "@/graphql/generated/schema";
import { Card, Avatar, Box, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { SearchIcon, AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Channels() {
  const router = useRouter();
  const { groupId } = router.query; // Récupère groupId depuis l'URL
  const [searchMember, setSearchMember] = useState(""); 
  const { t } = useTranslation();
  const { data: groupDetails, loading, error } = useGetGroupDetailsQuery({
    variables: { groupId: parseFloat(groupId as string) },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading group details: {error.message}</Text>;

  const group = groupDetails?.group;

  const avatarColors = ['primary.medium', 'secondary.high', 'tertiary.medium', 'orange.500'];
  
  const filteredMembers = group?.members?.filter((member) =>
    member.firstName.toLowerCase().includes(searchMember.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchMember.toLowerCase())
  );

  return (
    <>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back"
        variant="ghost"
        mb="4"
        onClick={() => router.back()} 
      />
      <Box p="4" mx='2' bg={'white'} height={'full'} boxShadow={'0px -2px #00000025'} borderRadius={'xl'}>
        <Box textAlign="center" mb="4">
          <Heading size="lg" my={4}>{group?.name || t("group-name")}</Heading> 
        </Box>
        <Flex justifyContent="center" my={8}>
          <Stack direction="row" spacing={4}>
            {group?.members?.map((member, index) => (
              <Avatar key={member.id} 
                      name={member.firstName + " " + member.lastName} 
                      bg={avatarColors[index % avatarColors.length]}
                      color='white' />
            ))}
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Member"
              borderRadius="full"
              bg='transparent'
              border="1px solid #084F2D"
              size={'lg'}
              _hover={{
                textDecoration: 'none',
                bg: 'secondary.medium',
              }}
            />
          </Stack>
        </Flex>
        <InputGroup my={8} width={{ base: "95%", md: "48rem" }} m="auto" bg="white" border="1px" borderColor="gray.300" borderRadius="full" height="50px" boxShadow='2px 2px #00000025'>
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
            <Card className="items-start pl-8"
              key={member.id}
              align="center"
              width={{ base: "95%", md: "48rem" }}
              m="auto"
              h="100%"
              paddingBlock="1rem"
              marginBlock="1rem"
              bg="secondary.lowest"
              boxShadow={'lg'}
              borderRadius={'lg'}
            >
              <Flex align="center" pr={2}>
                <Avatar name={member.firstName + " " + member.lastName} 
                bg={avatarColors[index % avatarColors.length]} 
                color='white' mr="4" />
                <Box>
                  <Text as='b' size="md" flexWrap='wrap' color={'primary.medium'}>{t("present-ideas")} {member.firstName + " " + member.lastName}</Text>
                </Box>
              </Flex>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
