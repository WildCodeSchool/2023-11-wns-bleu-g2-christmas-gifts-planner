import client from "@/graphql/client";
import { useLoginMutation, useProfileQuery } from "@/graphql/generated/schema";
import { Box, Button, Center, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, Link, Text } from "@chakra-ui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [error, setError] = useState<number | string>(0);
  const [login]= useLoginMutation();
  const { t } = useTranslation();
  const router = useRouter();
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  useEffect(() => {
    if (error !== 0) {
      const timer = setTimeout(() => {
        setError(0);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError(0);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    try {
      const res = await login({ variables: { data: formJSON } });
      router.push('/dashboard')
    } catch (e: any) {
      if(e.message === "Invalid Credentials") {
        setError(1)
      } else if(e.message === "Invalid Password") {
        setError(2)
      } else setError(`Une erreur est survenue : ${e}`);
    } finally {
      client.resetStore()
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
          icon={<ArrowLeft color="#003B1E"/>}
        />
        </Link>
      <Heading as="h1" fontSize='6xl' fontWeight="bold" mt={8} textAlign="center" color="green.800">{t("welcome-back")}</Heading>
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
            <FormLabel fontSize={14} fontWeight="bold" mb={1} color="green.800">{t("email-adress")}</FormLabel>
              <Input isRequired autoComplete="" variant="goldenInput" type="email" id="email" name="email" borderRadius={15} borderColor="green.800" />
              {error === 1 && (
                <Text position="absolute" mt={1} fontSize={14} fontWeight="bold" color="red.700">{t("email-adress-invalid")}</Text>
              )}
              
              <FormLabel mt={6} fontSize={14} fontWeight="bold" mb={1} color="green.800">{t("password")}</FormLabel>
              <Input
                name="password"
                id="password"
                isRequired
                type='password'
                variant="goldenInput"
                borderRadius={15}
                borderColor="green.800"
              />
              {error === 2 && (
                <Text position="absolute" mt={1} fontSize={14} fontWeight="bold" color="red.700">{t("incorrect-password")}</Text>
              )}
                <Flex justify="flex-end">
                <Link color="gray.400" fontSize={12}  _hover={{ bg: "gray.200" }} p={1} borderRadius="md">{t("forgot-password")}</Link>
                </Flex>
              <Center>
            <Button type="submit" my={4} variant="goldenButton" py={5} px={6}>
              <Text fontSize={18}>{t("sign-in")}</Text>
            </Button>
            </Center>
            </FormControl>
          </form>
        </Box>
      </Center>
      <Box ml={6} mt={16}>
              <Text>{t("not-signed-up")} <Link href="/signup" color="gray.400">{t("sign-up1")}</Link></Text>
            </Box>
    </>
);
}
export default Login;