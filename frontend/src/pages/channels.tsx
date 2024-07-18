import { useProfileQuery } from "@/graphql/generated/schema";
import { Card, Avatar, Box, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { SearchIcon, AddIcon, ArrowBackIcon } from "@chakra-ui/icons";

export default function Channels() {
  const { data: currentUser, refetch } = useProfileQuery({
    errorPolicy: "ignore",
  });
  console.log(currentUser);

  type UserName = 'Robin Kolasinski' | 'Alon Ben David' | 'Jasmine Grozinger' | 'Alexandre Richert';

  // Mappage des couleurs pour chaque utilisateur
  const avatarColors: Record<UserName, string> = {
    'Robin Kolasinski': 'primary.medium',
    'Alon Ben David': 'secondary.high',
    'Jasmine Grozinger': 'tertiary.medium',
    'Alexandre Richert': 'orange.500'
  };

  const userNames: UserName[] = [
    'Robin Kolasinski', 
    'Alon Ben David', 
    'Jasmine Grozinger', 
    'Alexandre Richert'
  ];
    return (
    <>
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Back"
          variant="ghost"
          mb="4"
        />
        <Box p="4" mx='2' bg={'white'} height={'full'} boxShadow={'0px -2px #00000025'} borderRadius={'xl'}>

            <Box textAlign="center" mb="4">
            <Heading size="lg" my={4}>Nom du Groupe</Heading>
            </Box>
            <Flex justifyContent="center" my={8}>
                <Stack direction="row" spacing={4}>
                    {userNames.map((name) => (
                    <Avatar key={name} name={name} bg={avatarColors[name]} color='white' />
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
            <Input type="text" placeholder="Trouver un fil de discussion" height="full" borderRadius="full" />
            </InputGroup>
            <Box my={8}>
            {['Robin Kolasinski', 'Alon Ben David', 'Jasmine Grozinger','Alexandre Richert'].map((name) => (
                <Card className="items-start pl-8"
                key={name}
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
                    <Avatar name={name} bg={avatarColors[name as UserName]} color='white' mr="4" />
                    <Box>
                    <Text as='b' size="md"  flexWrap='wrap'  color={'primary.medium'}>Idées cadeaux pour {name}</Text>
                    </Box>
                </Flex>
                </Card>
            ))}
            </Box>
        </Box>
    </>
  );
}
