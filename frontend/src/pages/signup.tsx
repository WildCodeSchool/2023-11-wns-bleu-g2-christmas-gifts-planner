import { useSignupMutation } from "@/graphql/generated/schema";
import { Avatar, Box, Button, Center, Flex, FormControl, Grid, GridItem, Heading, IconButton, Input, InputGroup, Link, Text, useToast } from '@chakra-ui/react';
import { ArrowLeft, X } from "lucide-react";
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
	const defaultAvatar = "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?w=300&ssl=1"
  const [error, setError] = useState("");
  const [createUser, {data, loading}] = useSignupMutation();
	const [avatar, setAvatar] = useState<string | null | undefined>(null);
	const [avatarFile, setAvatarFile] = useState<string | null | undefined>(null);
  const toast = useToast();

	const handleAvatarClick = () => {
    document.getElementById('avatarInput')?.click();
  };

  const handleAvatarChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
			reader.onload = () => {
        const dataURL = reader.result as string;
        setAvatar(dataURL);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    } else {
      toast({
        title: "Invalid file type.",
        description: "Cette image n'est pas au format .png",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

	const handleRemoveAvatar = () => {
    setAvatar(undefined);
    setAvatarFile(null);
    const input = document.getElementById('avatarInput') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

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
      const res = await createUser({variables: {data: formJSON}})
      console.log({ res });
      alert("Vous êtes bien enregistré.e, Merci !");
    } catch (e: any) {
      if (e.message === "EMAIL_ALREADY_TAKEN")
        setError("Cet e-mail est déjà pris");
      else setError("une erreur est survenue");
    }
  };

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
      <FormControl bgColor="#FFFEF9">
			{/* <Center>
			<Flex align="center" position="relative">
                {avatar ? (
                  <Avatar
                    size="xl"
                    name="Avatar"
                    src={avatar}
                    cursor="pointer"
                    onClick={handleAvatarClick}
                  />
                ) : (
                  <Avatar
                    size="xl"
                    name="Avatar"
                    src={defaultAvatar}
                    cursor="pointer"
                    onClick={handleAvatarClick}
                  />
                )}
                {avatar && (
                  <IconButton
                    aria-label="Remove Avatar"
                    icon={<X />}
                    size="sm"
                    position="absolute"
                    top={0}
                    right={0}
                    onClick={handleRemoveAvatar}
                  />
                )}
              </Flex>
            </Center>
            <Input
              type="file"
              id="avatarInput"
              accept="image/png"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            /> */}
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
        <Input type='email' isRequired autoComplete="" id="label-email" name="email" placeholder="Adresse mail" my={4} 
            borderRadius={15}
						borderColor="green.600"/>
        <InputGroup size='md'>
      <Input
         name="password" id="password" required
        type='password'
        placeholder='Mot de passe'
            borderRadius={15}
						borderColor="green.600"
      />
    </InputGroup>
        <InputGroup size='md' mt={4}>
      <Input
         name="passwordConfirmation" id="passwordConfirmation" isRequired
        type={'password'}
        placeholder='Confirmer le mot de passe'
            borderRadius={15}
						borderColor="green.600"
      />
    </InputGroup>
		<Center>
      <Button variant="goldenButton" type="submit" mt={4}>
      S&apos;inscrire
    	</Button>
		</Center>
      </FormControl>
      </form>
      </Box>
      </Center>
			<Text ml={16} mt={4} fontSize={12}>Déjà inscrit ? <Link href='/login' color="gray">Se connecter</Link></Text>
        {error !== "" && <pre>{error}</pre>}
        </>
  );
}
