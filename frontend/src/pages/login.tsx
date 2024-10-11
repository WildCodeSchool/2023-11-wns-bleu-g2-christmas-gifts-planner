import client from "@/graphql/client";
import { useLoginMutation, useProfileQuery } from "@/graphql/generated/schema";
import { Box, Button, Card, Center, Flex, FormControl, FormLabel, Grid, GridItem, Heading, IconButton, Image, Input, Link, Show, Text } from "@chakra-ui/react";
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
    icon={<ArrowLeft color="#003B1E" />}
  />
</Link>

<Grid
  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
  mt={4}
  alignItems="center"
>
  <GridItem>
    <Heading
      as="h1"
      fontSize={{base: "6xl", md: "76", lg: "96" }}
      fontWeight="bold"
      mt={{ base: 4, md: 8 }}
      ml={8}
      textAlign="center"
      color="primary.low"
    >
      {t("welcome-back")}
    </Heading>
    <Show above="md">
      <Center>
      <Image src="/images/Gifts-rafiki.svg" alt="GiftsRafiki" />
      </Center>
    </Show>
  </GridItem>
  <GridItem>
    <Center>
      <Card
        mx={{ base: "12px", md: "24px" }}
        mt={{ base: "16px", md: "8px" }}
        p={4}
        maxW="800px"
        w={{ base: "100%", md: "90%" }}
        data-testid="card"
        bgColor="#FFFEF9"
        border="1px solid gray"
        borderRadius={15}
        boxShadow="1px 1px 3px 1px gray"
      >
        <Image src="/Gifty-logo.svg" alt="Gifty" mt={4} mx="35%" />
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel
              fontSize={14}
              fontWeight="bold"
              mb={1}
              color="primary.low"
            >
              {t("email-adress")}
            </FormLabel>
            <Input
              isRequired
              autoComplete=""
              variant="goldenInput"
              type="email"
              id="email"
              name="email"
            />
            {error === 1 && (
              <Text
                position="absolute"
                mt={1}
                fontSize={14}
                fontWeight="bold"
                color="tertiary.medium"
              >
                {t("email-adress-invalid")}
              </Text>
            )}

            <FormLabel
              mt={6}
              fontSize={14}
              fontWeight="bold"
              mb={1}
              color="primary.low"
            >
              {t("password")}
            </FormLabel>
            <Input
              name="password"
              id="password"
              isRequired
              type="password"
              variant="goldenInput"
            />
            {error === 2 && (
              <Text
                position="absolute"
                mt={1}
                fontSize={14}
                fontWeight="bold"
                color="tertiary.medium"
              >
                {t("incorrect-password")}
              </Text>
            )}
            <Flex justify="flex-end">
              <Link
                color="gray.400"
                fontSize={12}
                _hover={{ bg: "gray.200" }}
                p={1}
                borderRadius="md"
              >
                {t("forgot-password")}
              </Link>
            </Flex>
            <Center>
              <Button
                type="submit"
                my={4}
                variant="goldenButton"
                py={5}
                px={6}
              >
                <Text fontSize={18}>{t("sign-in")}</Text>
              </Button>
            </Center>
          </FormControl>
        </form>
    <Box ml={6} mt={16}>
      <Text>
        {t("not-signed-up")}{" "}
        <Link href="/signup" color="gray.400">
          {t("sign-up1")}
        </Link>
      </Text>
    </Box>
      </Card>
    </Center>
  </GridItem>
</Grid>
</>
);
}
export default Login;