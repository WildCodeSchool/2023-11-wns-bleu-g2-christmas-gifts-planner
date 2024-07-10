import { useProfileQuery, useUpdateUserMutation } from "@/graphql/generated/schema";
import { Box, Button, Center, FormControl, Grid, GridItem, IconButton, Input, InputGroup, Link, Text, Tooltip, useToast } from "@chakra-ui/react";
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
    interface UpdateUserFormProps {
        userId: string | undefined;
      }

const UserProfile = ({ userId }: UpdateUserFormProps) => {
    const [arrayOfErrors, setArrayOfErrors] = useState<string[]>([])
    const [error, setError] = useState<string | number>(0);
    const [updateUser] = useUpdateUserMutation();
    const toast = useToast();
    const router = useRouter()

    const [formData, setFormData] = useState({
      email: undefined,
      oldPassword: undefined,
      newPassword: undefined,
      firstName: undefined,
      lastName: undefined
    });

    const { data: currentUser } = useProfileQuery({
        errorPolicy: "ignore",
      });
      
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    
    useEffect(() => {
        if(currentUser === undefined || currentUser === null){
             router.push("/login")
            }
        if (error === 1 || error === 2) {
          const timer = setTimeout(() => {
            setError(0);
          }, 4000);
    
          return () => clearTimeout(timer);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentUser, error]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setError(0);
        setArrayOfErrors([]);
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: any = Object.fromEntries(formData.entries());
        const errors = validatePassword(formJSON.newPassword);
        let err = 0;
        console.log(formJSON)
        if(formJSON.newPassword !== "" && errors.length > 0) {
            setArrayOfErrors(errors);
            err = 4;
            setError(4)
        } else if(err === 0){
            if (formJSON.newPassword !== formJSON.passwordConfirmation){
                err = 1;
                return setError(1);
            }
        };
        delete formJSON.passwordConfirmation;

        try{
            if(err === 0) {
                const res = await updateUser({variables: {data: formJSON, userId: currentUser!.profile.id}})
                console.log({ res });
                toast({
                    title: "Profile modifié !",
                    description: "Votre profil a bien été modifié",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
            }
        } catch (e: any) {{
            if (e.message === "EMAIL_ALREADY_TAKEN"){
              err = 2
              setError(2);
            }
            else setError("une erreur est survenue");
          }
    }
}

    return(
        <>
        <Link href='/'>
            <IconButton aria-label="Back" bg="transparent" boxShadow="none" _hover={{ bg: "gray.200" }} icon={<ArrowLeft color="#22543D"/>}/>
        </Link>
        <Center>
            <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="transparent" border="none" boxShadow="none">
                <form onSubmit={handleSubmit}>
                    <FormControl bgColor="#FFFEF9">
                        {/* Firstname and lastname */}
                        <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
                            <GridItem>
                                <Input type="text" name="firstName" id="firstName" minLength={2} maxLength={30} placeholder="Nom" width="100%" borderRadius={15} borderColor="green.600" onChange={handleChange}/>
                            </GridItem>
                            <GridItem>
                                <Input type="text" name="lastName" id="lastName" minLength={2} maxLength={30} placeholder="Prénom" width="100%" borderRadius={15} borderColor="green.600" onChange={handleChange}/>
                            </GridItem>
                        </Grid>
                        {/* Email */}
                        {error === 2 &&
                                <Text position="absolute" fontSize={14} fontWeight="bold" color="red.700">Cet e-mail existe déjà</Text>
                                }
                        <Input type='email' id="email" data-testid="label-email" name="email" placeholder="Adresse mail" my={6} borderRadius={15} borderColor={error === 2 ? "red.700" : "green.600"} onChange={handleChange}/>
                         {/* Old Password */}
                         <InputGroup size='md'>
                            {error === 3 &&
                                <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700">Le mot de passe n&aposest pas le même !</Text>
                                }
                            <Input name="oldPassword" id="oldPassword" type='password' placeholder='Ancien mot de passe' borderRadius={15} borderColor={error === 3 ? "red.700" : "green.600"} onChange={handleChange}/>
                        </InputGroup>
                        {/* New Password and confirm Password */}
                        <InputGroup size='md' mt={6}>
                            {error === 1 &&
                                <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700">Les mots de passe ne correspondent pas !</Text>
                                }
                            {error === 4 && <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700" >
                                <Text position="absolute" mt={-6} fontSize={14} fontWeight="bold" color="red.700">Ce mot de passe n&apos;est pas autorisé</Text>
                                    <Tooltip label={arrayOfErrors.map((error, index) => (<Text key={index} fontSize={12}>{error}</Text>))}>
                                        <IconButton icon={<InfoIcon height={22}/>} aria-label="seeMore" h={4} variant="none" bgColor="transparent" boxShadow="none" />
                                    </Tooltip>
                                </Text> 
                                }
                            <Input name="newPassword" id="newPassword" type='password' placeholder='Nouveau mot de passe' borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                        </InputGroup>
                        <InputGroup size='md' mt={6} zIndex={0}>
                            <Input name="passwordConfirmation" zIndex={0} id="passwordConfirmation" type='password' placeholder='Confirmer le nouveau mot de passe' borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                        </InputGroup>
                        <Center>
                            <Button variant="goldenButton" type="submit" mt={8}>
                                Modifier
                            </Button>
                        </Center>
                    </FormControl>
                </form>
            </Box>
        </Center>
        </>
    )
}
export default UserProfile;