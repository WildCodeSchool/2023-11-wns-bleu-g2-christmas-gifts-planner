import { useSignupMutation } from "@/graphql/generated/schema";
import { Button, Card, Center, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { FormEvent, useState } from "react";

function validatePassword(p: string) {
  let errors = [];
  if (p.length < 8)
    errors.push("Le mot de passe doit faire minimum 8 caractères");
  if (p.search(/[a-z]/) < 0)
    errors.push("Le mot de passe doit contenir une minuscule");
  if (p.search(/[A-Z]/) < 0)
    errors.push("Le mot de passe doit contenir une majuscule");
  if (p.search(/[0-9]/) < 0)
    errors.push("Le mot de passe doit contenir un chiffre");
  return errors;
}

export default function Signup() {
  const [error, setError] = useState("");
  const [createUser] = useSignupMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    const errors = validatePassword(formJSON.password);
    if (errors.length > 0) return setError(errors.join("\n"));
    if (formJSON.password !== formJSON.passwordConfirmation)
      return setError("les mots de passe ne coresspondent pas");

    // do not send confirmation since it's checked on the frontend
    delete formJSON.passwordConfirmation;

    try {
      const res = await createUser({ variables: { data: formJSON } });
      console.log({ res });
      alert("Vous etes bien enregistré.e. Merci !");
    } catch (e: any) {
      if (e.message === "EMAIL_ALREADY_TAKEN")
        setError("Cet e-mail est déjà pris");
      else setError("une erreur est survenue");
    }
  };
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      <Heading as="h1" fontSize='6xl' fontWeight="bold">Crée un compte</Heading>
      <Center>
      <Card mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" >
<form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel data-testid = 'label-email'>Email address</FormLabel>
        <Input type='email' isRequired autoComplete="" id="email" name="email"/>

        <FormLabel>First Name</FormLabel>
        <Input type="text"
            name="firstName"
            id="firstName"
            minLength={2}
            maxLength={30}
            isRequired/>

        <FormLabel>Last Name</FormLabel>
        <Input type="text"
            name="lastName"
            id="lastName"
            minLength={2}
            maxLength={30}
            isRequired />

        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
      <Input
         name="password" id="password" required
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>

        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size='md'>
      <Input
         name="passwordConfirmation" id="passwordConfirmation" isRequired
        type={show ? 'text' : 'password'}
        placeholder='Confirm password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
      <Button type="submit" mt={6}>
      S&apos;inscrire
    </Button>
      </FormControl>
      </form>
      </Card>
      </Center>

        {error !== "" && <pre>{error}</pre>}
        </>
  );
}
