import { useLoginMutation } from "@/graphql/generated/schema";
import { Box, Button, Card, Center, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [error, setError] = useState("");
  const [login]= useLoginMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    try {
      const res = await login({ variables: { data: formJSON } });
      console.log({ res });
    } catch (e: any) {
     setError(`une erreur est survenue: ${e}`);
    }
  };

  return (
    <>
    <Link href='/'>
        <IconButton
          aria-label="Back"
					bg="transparent"
					boxShadow="none"
          _hover={{ bg: "gray.200" }}
          icon={<ArrowLeft color="#22543D"/>}
        />
        </Link>
      <Heading as="h1" fontSize='6xl' fontWeight="bold" mt={8} textAlign="center" color="green.800">Welcome Back</Heading>
      <Image src="/Gifty-logo.svg" alt="Gifty" mt={8} w="20%" mx="40%"/>
      <Center>    
      <Box
        mx="24px"
        mt="8px"
        p={4}
        maxW="500px"
        w="90%"
        data-testid="card"
        bgColor="transparent"
        border="none"
        boxShadow="none"
      >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel fontSize={14} fontWeight="bold" mb={1} color="green.800">Adresse mail</FormLabel>
              <Input isRequired autoComplete="" type="email" id="email" name="email" borderRadius={15} borderColor="green.800" />

              <FormLabel mt={4} fontSize={14} fontWeight="bold" mb={1} color="green.800" >Mot de passe</FormLabel>
                <Input
                  name="password" id="password" isRequired
                  type={show ? 'text' : 'password'}
                  borderRadius={15} borderColor="green.800"
                />
                <Flex justify="flex-end">
                <Link color="gray.400" fontSize={12}  _hover={{ bg: "gray.200" }} p={1} borderRadius="md">Mot de passe oublié ?</Link>
                </Flex>
              <Center>
            <Button type="submit" my={4} variant="goldenButton" py={5} px={6}>
              <Text fontSize={18}>Se Connecter</Text>
            </Button>
            </Center>
            </FormControl>
          </form>
        </Box>
      </Center>
      <Box ml={6} mt={16}>
              <Text>Pas encore inscrit ? <Link href="/signup" color="gray.400">Inscrivez-vous</Link></Text>
            </Box>
    </>
);
}
export default Login;