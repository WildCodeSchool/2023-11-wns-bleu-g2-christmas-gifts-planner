import client from "@/graphql/client";
import { useLoginMutation, useSignupMutation } from "@/graphql/generated/schema";
import { Box, Button, Card, Center, FormControl, Grid, GridItem, Heading, IconButton, Image, Input, InputGroup, Link, Show, Text, Tooltip, useToast } from '@chakra-ui/react';
import { ArrowLeft, InfoIcon } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";



export default function Signup() {
  const [arrayOfErrors, setArrayOfErrors] = useState<string[]>([])
  const [error, setError] = useState<string | number>(0);
  const [createUser] = useSignupMutation();
  const [login]= useLoginMutation();
  const toast = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  function validatePassword(p: string) {
  let errors = [];
  if (p.length < 8)
    errors.push(t("character-limit"));
  if (p.search(/[a-z]/) < 0)
    errors.push(t("password-lowercase"));
  if (p.search(/[A-Z]/) < 0)
    errors.push(t("password-uppercase"));
  if (p.search(/[0-9]/) < 0)
    errors.push(t("password-number"));
  return errors;
}
  useEffect(() => {
    if (error === 1 || error === 2) {
      const timer = setTimeout(() => {
        setError(0);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError(0);
    setArrayOfErrors([]);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    const errors = validatePassword(formJSON.password);

    let err = 0;
    if (errors.length > 0) {
      setArrayOfErrors(errors); 
      err = 4
      setError(4)
    } else if(err === 0) {
      if (formJSON.password !== formJSON.passwordConfirmation){
        err = 1
        return setError(1);
      }
    }

    // do not send confirmation since it's checked on the frontend
    delete formJSON.passwordConfirmation;
    
  try {
    if(err === 0){
      await createUser({variables: {data: formJSON}})
      await login({variables: {data: {email: formJSON.email, password: formJSON.password }}})
      router.push('/dashboard')
      toast({
        title: t("success-signed-up"),
        description: t("description-success-signed-up"),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    } catch (e: any) {
      if (e.message === "EMAIL_ALREADY_TAKEN"){
        err = 2
        setError(2);}
      else setError("une erreur est survenue");
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
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} mt={4} alignItems="center">
        <GridItem>
            <Heading
        as="h1"
        fontSize={{base: "6xl", md: "76", lg: "96" }}
        fontWeight="bold"
        mt={{ base: 4, md: 8 }}
        ml={8}
        textAlign="center"
        color="green.800"
            >
                {t("create-account")}
            </Heading>
            <Show above="md">
                <Center mt={4}>
                    <Image src="/images/Gifts-rafiki.svg" alt="GiftsRafiki" />
                </Center>
            </Show>
        </GridItem>
        <GridItem>
            <Center>
                <Card
                    mx="24px"
                    mt="8px"
                    p={4}
                    maxW="500px"
                    w="90%"
                    data-testid="card"
                    bgColor="#FFFEF9"
                    border="1px solid gray"
                    borderRadius={15}
                    boxShadow="1px 1px 3px 1px gray"
                ><Image src="/Gifty-logo.svg" alt="Gifty" mt={4} mx="35%" />
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            {/* Prénom et nom de famille */}
                            <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
                                <GridItem>
                                    <Input
                                        variant="goldenInput"
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        minLength={2}
                                        maxLength={30}
                                        isRequired
                                        placeholder={t("lastname")}
                                        width="100%"
                                        borderRadius={15}
                                        borderColor="green.600"
                                    />
                                </GridItem>
                                <GridItem>
                                    <Input
                                        variant="goldenInput"
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        minLength={2}
                                        maxLength={30}
                                        isRequired
                                        placeholder={t("firstname")}
                                        width="100%"
                                        borderRadius={15}
                                        borderColor="green.600"
                                    />
                                </GridItem>
                            </Grid>

                            {/* Email */}
                            {error === 2 ? (
                                <Text position="absolute" fontSize={14} fontWeight="bold" color="red.700">
                                    {t("email-already-existing")}
                                </Text>
                            ) : ""}
                            <Input
                                type="email"
                                isRequired
                                id="email"
                                data-testid="label-email"
                                name="email"
                                variant="goldenInput"
                                placeholder={t("email-adress")}
                                my={6}
                                borderRadius={15}
                                borderColor={error === 2 ? "red.700" : "green.600"}
                            />

                            {/* Mot de passe et confirmation */}
                            <InputGroup size='md'>
                                {error === 1 && (
                                    <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700">
                                        {t("passwords-are-not-equals")}
                                    </Text>
                                )}
                                {error === 4 && (
                                    <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700">
                                        {t("unauthorized-password")}
                                        <Tooltip
                                            label={arrayOfErrors.map((error, index) => (
                                                <Text key={index} fontSize={12}>{error}</Text>
                                            ))}
                                        >
                                            <IconButton icon={<InfoIcon height={22}/>} aria-label="seeMore" h={4} variant="none" bgColor="transparent" boxShadow="none" />
                                        </Tooltip>
                                    </Text>
                                )}
                                <Input
                                    name="password"
                                    id="password"
                                    isRequired
                                    type='password'
                                    variant="goldenInput"
                                    placeholder={t("password")}
                                    borderRadius={15}
                                    borderColor={error === 1 || error === 4 ? "red.700" : "green.600"}
                                />
                            </InputGroup>

                            <InputGroup size='md' mt={6} zIndex={0}>
                                <Input
                                    name="passwordConfirmation"
                                    id="passwordConfirmation"
                                    isRequired
                                    variant="goldenInput"
                                    type='password'
                                    placeholder={t("confirm-password")}
                                    borderRadius={15}
                                    borderColor={error === 1 || error === 4 ? "red.700" : "green.600"}
                                />
                            </InputGroup>
                            <Center>
                                <Button variant="goldenButton" type="submit" mt={4} px={6}>
                                    {t("sign-up2")}
                                </Button>
                            </Center>
                        </FormControl>
                    <Box ml={6} mt={16}>
                    <Text mt={4} fontSize={12}>
                        {t("already-have-an-account")}{" "}
                        <Link href='/login' _hover={{ bg: "gray.200" }} p={1} borderRadius="md" color="gray">
                            {t("sign-in")}
                        </Link>
                    </Text>
                    </Box>
                    </form>
                </Card>
            </Center>
        </GridItem>
    </Grid>
</>

  );
}
