import { useSignupMutation } from "@/graphql/generated/schema";
import { Box, Button, Center, FormControl, Grid, GridItem, Heading, IconButton, Input, InputGroup, Link, Text, Tooltip, useToast } from '@chakra-ui/react';
import { ArrowLeft, InfoIcon } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

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
  const [arrayOfErrors, setArrayOfErrors] = useState<string[]>([])
  const [error, setError] = useState<string | number>(0);
  const [createUser] = useSignupMutation();
  const toast = useToast();
  const router = useRouter();
  
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
      const res = await createUser({variables: {data: formJSON}})
      router.push('/dashboard')
      toast({
        title: "Vous êtes bien enregistré.e !",
        description: "Votre inscription a bien été prise en compte",
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
  <FormControl bgColor="#FFFEF9">
      {/* Firstname and lastname */}
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
						borderColor="green.600"
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
						borderColor="green.600"
          />
        </GridItem>
      </Grid>
      {/* Email */}
      {error === 2 ? 
                <Text position="absolute" fontSize={14} fontWeight="bold" color="red.700">Cet e-mail existe déjà</Text>
              : ""}
        <Input type='email' 
        isRequired
        id="email" 
        data-testid="label-email" 
        name="email" 
        placeholder="Adresse mail" 
        my={6}
        borderRadius={15}
				borderColor={error === 2 ? "red.700" : "green.600"}
        />
{/* Password and confirm Password */}
        <InputGroup size='md'>
              {error === 1 &&
                <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700">Les mots de passe ne correspondent pas !</Text>
               }
               {error === 4 && <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700" >
                Ce mot de passe n&apos;est pas autorisé 
                <Tooltip label={arrayOfErrors.map((error, index) => (<Text key={index} fontSize={12}>{error}</Text>))
                }>
                  <IconButton icon={<InfoIcon height={22}/>} aria-label="seeMore" h={4} variant="none" bgColor="transparent" boxShadow="none" /></Tooltip></Text> }


          <Input
          name="password" 
          id="password" 
          isRequired
          type='password'
          placeholder='Mot de passe'
          borderRadius={15}
					borderColor={error === 1 || error === 4 ? "red.700" : "green.600"}
          />
        </InputGroup>
        <InputGroup size='md' mt={6} zIndex={0}>
          <Input
          name="passwordConfirmation" zIndex={0}
          id="passwordConfirmation" 
          isRequired
          type={'password'}
          placeholder='Confirmer le mot de passe'
          borderRadius={15}
					borderColor={error === 1 || error === 4 ? "red.700" : "green.600"}
          />
        </InputGroup>
		    <Center>
          <Button variant="goldenButton" type="submit" mt={8}>
            S&apos;inscrire
          </Button>
		    </Center>
      </FormControl>
    </form>
  </Box>
  </Center>
			<Text ml={16} mt={4} fontSize={12}>Déjà inscrit ? <Link href='/login'  _hover={{ bg: "gray.200" }}  p={1} borderRadius="md" color="gray">Se connecter</Link></Text>
</>
  );
}
