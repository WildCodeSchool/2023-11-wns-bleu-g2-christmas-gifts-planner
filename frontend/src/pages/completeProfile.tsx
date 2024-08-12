import { useCompleteProfileMutation } from "@/graphql/generated/schema";
import { ApolloError } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Check, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function CompleteProfile() {
  //Get the token from the URL query params
  const router = useRouter();
  const token = router.query.token as string;

  // Use the useCompleteProfileMutation hook to handle the mutation for completing the profile
  const [CompleteProfile, { error }] = useCompleteProfileMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson: any = Object.fromEntries(formData.entries());
    delete formJson.passwordConfirmation;

    try {
      await CompleteProfile({
        variables: {
          data: formJson,
          token: token,
        },
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 5000);
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("GraphQL Error:", error.graphQLErrors);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction="column"
        gap={3}
        width={{ base: "95%", md: "48rem" }}
        m="auto"
      >
        <Card
          paddingBlock={{ base: "0", md: "6" }}
          paddingInline={{ base: "0", md: "32" }}
          bg={"secondary.lowest"}
        >
          <CardHeader pb={0} fontWeight="bold">
            Compléter votre profil
          </CardHeader>
          <CardBody>
            <FormControl isRequired mt={3}>
              <FormLabel>Nom</FormLabel>
              <Input
                type="text"
                name="lastName"
                placeholder="Votre nom"
                variant="goldenInput"
              />
            </FormControl>
            <FormControl isRequired mt={3}>
              <FormLabel>Prénom</FormLabel>
              <Input
                type="text"
                name="firstName"
                placeholder="Votre prénom"
                variant="goldenInput"
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="example@mail.com"
                variant="goldenInput"
              />
            </FormControl>
          </CardBody>
        </Card>
        <Card
          paddingBlock={{ base: "0", md: "6" }}
          paddingInline={{ base: "0", md: "32" }}
          bg={"secondary.lowest"}
        >
          <CardHeader pb={0} fontWeight="bold">
            Configurer votre mot de passe
          </CardHeader>
          <CardBody>
            <FormControl isRequired mt={3}>
              <FormLabel>Ajouter un mot de passe</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Votre mot de passe"
                  variant="goldenInput"
                />
                <InputRightElement>
                  <Box as="button" type="button" onClick={toggleShowPassword}>
                    {showPassword ? <Eye /> : <EyeOff />}
                  </Box>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired mt={3}>
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="passwordConfirmation"
                  placeholder="Confirmer votre mot de passe"
                  variant="goldenInput"
                />
                <InputRightElement>
                  <Box
                    as="button"
                    type="button"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? <Eye /> : <EyeOff />}
                  </Box>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </CardBody>
        </Card>
        <Flex justify="flex-end" pr={{ base: "0", md: "10" }}>
          <Button type="submit" variant="redButton" leftIcon={<Check />}>
            Valider
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}
