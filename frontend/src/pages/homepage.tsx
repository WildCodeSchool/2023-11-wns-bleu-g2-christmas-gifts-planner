import { Box, Button, Card, CardBody, CardHeader, Center, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Gift, Group, UsersRound } from 'lucide-react';



export default function Homepage() {
 
    return (
<Center bg="yellow.50" height="100vh">

<Box flexDirection="column"   >
  <Center>
  <Heading fontSize="m">
  Organisez vos cadeaux de Noël en 
  Groupe avec   
      
  </Heading>
  </Center>
    

<Link href='/'>
  <Card  mx="24px" mt="4%" boxShadow="5px 4px 5px rgb(0, 59, 30)"   borderWidth="1px">
    <Center mt="5%" mb="-18px">

    <Group   color='rgb(161, 7, 2)'/>

    </Center>

    <CardHeader mb="-40px">
        <Heading size='sm'>Etape 1 : Créez votre cercle de Noël</Heading>
      </CardHeader>

      <CardBody>
          <Box>

            <Text pt='2' fontSize='sm'>
            Commencez par créer votre groupe familial ou entre amis pour organiser les cadeaux de Noël de manière collaboratives      </Text>
          </Box>


      </CardBody>
    </Card>
</Link>

<Link href='/'>
  <Card  mx="24px" mt="4%" boxShadow="5px 4px 5px rgb(0, 59, 30)"   borderWidth="1px">
  <Center mt="5%" mb="-18px">

  <UsersRound color='rgb(161, 7, 2)'/>
  </Center>

  <CardHeader mb="-40px">
      <Heading size='sm'>Etape 2 : Invitez vos amis et votre famille</Heading>
    </CardHeader>

    <CardBody>
        <Box>

          <Text pt='2' fontSize='sm'>
          Invitez chaque membre de votre groupe à rejoindre l'application pour qu'ils puissent suggérer des idées de cadeaux.        </Text>
        </Box>


    </CardBody>
  </Card>
</Link> 

<Link href='/'>
  <Card  mx="24px" mt="4%" boxShadow="5px 4px 5px rgb(0, 59, 30)"   borderWidth="1px">
  <Center mt="5%" mb="-18px">

  <Gift color='rgb(161, 7, 2)'/>

  </Center>

  <CardHeader mb="-40px">
      <Heading size='sm'>Etape 3 : Planifiez vos surprises de Noël</Heading>
    </CardHeader>

    <CardBody>
        <Box>

          <Text pt='2' fontSize='sm'>
          Créez des listes de cadeaux pour chaque membre du groupe, discutez des idées et choisissez les cadeaux parfaits pour faire de Noël une fête inoubliable.       </Text>
        </Box>


    </CardBody>
  </Card>
</Link>

<Center>

  <Flex flexDirection='column'  gap={5} mt={5}>
  <Link href='/signup'>
  <Button width="150px" bg="rgb(255, 255, 255)"  variant='solid' rounded={50}  boxShadow="2px 2px 5px rgb(0, 0, 0)" >
  Pas de compte ?
    </Button>
  </Link>
   
   <Link href='/login'>
    <Button width="150px" mb="20px" bg="rgb(213, 166, 58)"  variant='solid' rounded={50}    boxShadow="2px 2px 5px rgb(0, 0, 0)">
    Se connecter
    </Button>
   </Link>
   </Flex>
</Center>

</Box>
</Center>
    );
  }