import { useSignupMutation } from "@/graphql/generated/schema";
import { Avatar, Box, Button, Center, FormControl, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ArrowLeft } from "lucide-react";
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

        <IconButton
          aria-label="Back"
					bg="transparent"
					boxShadow="none"
          icon={<ArrowLeft color="#22543D"/>}
        />
      <Heading as="h1" fontSize='6xl' fontWeight="bold" mt={8} textAlign="center" color="green.800">Créer un compte</Heading>

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
				<Center>
					<Avatar size="xl" bg="green.800" />
				</Center>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
        <GridItem>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            minLength={2}
            maxLength={30}
            isRequired
            placeholder="Nom"
            width="100%"
            borderRadius={15}
          />
        </GridItem>
        <GridItem>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            minLength={2}
            maxLength={30}
            isRequired
            placeholder="Prénom"
            width="100%"
            borderRadius={15}
          />
        </GridItem>
      </Grid>
        <Input type='email' isRequired autoComplete="" id="email" name="email" placeholder="Adresse mail" my={4} 
            borderRadius={15}/>
        <InputGroup size='md'>
      <Input
         name="password" id="password" required
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
            borderRadius={15}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
        <InputGroup size='md' mt={4}>
      <Input
         name="passwordConfirmation" id="passwordConfirmation" isRequired
        type={show ? 'text' : 'password'}
        placeholder='Confirm password'
            borderRadius={15}
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
      </Box>
      </Center>

        {error !== "" && <pre>{error}</pre>}
        </>
  );
}
