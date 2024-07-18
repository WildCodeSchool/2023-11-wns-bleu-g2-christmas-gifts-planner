import client from "@/graphql/client";
import { useProfileQuery, useUpdateUserMutation } from "@/graphql/generated/schema";
import isDefined from "@/types/isDefined";
import isValidNotEmptyString from "@/types/isValidNotEmptyString";
import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, GridItem, IconButton, Input, InputGroup, Link, Spacer, Text, Tooltip, useToast } from "@chakra-ui/react";
import { ArrowLeft, InfoIcon, Trash, Trash2 } from "lucide-react";
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

const UserProfile = () => {
    const [arrayOfErrors, setArrayOfErrors] = useState<string[]>([])
    const [error, setError] = useState<string | number>(0);
    const [updateUser] = useUpdateUserMutation();
    const toast = useToast();
  const router = useRouter()
    const { data: currentUser } = useProfileQuery({
      errorPolicy: "ignore",
    });
    const [formData, setFormData] = useState({
      email: "",
      oldPassword: "",
      newPassword: "",
      firstName: "",
      lastName: ""
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
    
    useEffect(() => {
      isDefined(currentUser) ?? router.push("/login")
        if (error === 1 || error === 2) {
          const timer = setTimeout(() => {
            setError(0);
          }, 4000);
    
          return () => clearTimeout(timer);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentUser, error, formData, setFormData]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setError(0);
        setArrayOfErrors([]);
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formJSON: any = Object.fromEntries(formData.entries());
        const errors = validatePassword(formJSON.newPassword);
        let err = 0;
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
                await updateUser({variables: {data: formJSON, userId: currentUser!.profile.id}})
                setFormData({
                  email: formJSON.email ?? currentUser!.profile.email,
                  oldPassword: "",
                  newPassword: "",
                  firstName: formJSON.firstName ?? currentUser!.profile.firstName,
                  lastName: formJSON.lastName ?? currentUser!.profile.lastName
              });
                toast({
                    title: "Profile modifié !",
                    description: "Votre profil a bien été modifié",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
            }
        } catch (e: any) {
            if (e.message === "EMAIL_ALREADY_TAKEN"){
              err = 2;
              setError(2);
            } else if(e.message === "INVALID_OLD_PASSWORD") {
                err = 3;
                setError(3);
            }
          } finally {
            client.resetStore();
           
          }
    }

    return(
        <>
        <Link href='/dashboard'>
            <IconButton aria-label="Back" bg="transparent" boxShadow="none" _hover={{ bg: "gray.200" }} icon={<ArrowLeft color="#22543D"/>}/>
        </Link>
            <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
                <form onSubmit={handleSubmit}>
                  <Text fontWeight="bold">Modifier le profil</Text>
                    <FormControl mt={6}>
                        {/* Firstname and lastname */}
                                <FormLabel>Prénom</FormLabel>
                                <Input type="text" name="lastName" id="lastName" minLength={2} maxLength={30} placeholder={isValidNotEmptyString(currentUser?.profile.lastName)? currentUser!.profile.lastName : "Nom"} width="100%" borderRadius={20} borderColor="green.600" onChange={handleChange} value={formData.lastName}/>                        
                        <FormLabel mt={4} >Nom</FormLabel>
                                <Input type="text" name="firstName" id="firstName" minLength={2} maxLength={30} placeholder={isValidNotEmptyString(currentUser?.profile.firstName)? currentUser!.profile.firstName : "Prénom"} width="100%" borderRadius={20} borderColor="green.600" onChange={handleChange} value={formData.firstName}/>
                                {/* Email */}
                        {error === 2 &&
                                <Text position="absolute" fontSize={14} fontWeight="bold" color="red.700">Cet e-mail existe déjà</Text>
                                }
                                <FormLabel mt={4}>E-mail</FormLabel>
                        <Input type='email' id="email" data-testid="label-email" name="email" placeholder={isValidNotEmptyString(currentUser?.profile.email) ? currentUser!.profile.email : "E-mail"} borderRadius={20} borderColor={error === 2 ? "red.700" : "green.600"} onChange={handleChange} value={formData.email}/>
                         </FormControl>
                         <Flex w="100%" justifyContent="flex-end">
                         <Button variant="greenButton" type="submit" mt={6}>
                                Modifier
                            </Button>
                            </Flex>
                </form>
                </Box>
                         {/* Old Password */}
                         <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
                         <form>
                         <Text fontWeight="bold">Modifier le mot de passe</Text>
                         <FormControl mt={6}>
                         <FormLabel >Mot de passe actuel</FormLabel>
                         <InputGroup size='md'>
                            <Input name="oldPassword" id="oldPassword" type='password' placeholder='Ancien mot de passe' borderRadius={15} borderColor={error === 3 ? "red.700" : "green.600"} onChange={handleChange}/>
                            {error === 3 &&
                                <Text position="absolute" mt={10} fontSize={14} fontWeight="bold" color="red.700">Le mot de passe n&apos;est pas le même !</Text>
                                }
                        </InputGroup>
                        {/* New Password and confirm Password */}
                        <FormLabel mt={6}>Nouveau mot de passe</FormLabel>
                        <InputGroup size='md' >
                            <Input name="newPassword" id="newPassword" type='password' placeholder='Nouveau mot de passe' borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                            {error === 1 &&
                                <Text position="absolute" mt={10} fontSize={14} fontWeight="bold" color="red.700">Les mots de passe ne correspondent pas !</Text>
                                }
                            {error === 4 && <Text position="absolute" mt={10} fontSize={14} fontWeight="bold" color="red.700" >Ce mot de passe n&apos;est pas autorisé
                                    <Tooltip label={arrayOfErrors.map((error, index) => (<Text key={index} fontSize={12}>{error}</Text>))} >
                                        <IconButton icon={<InfoIcon height={22}/>} aria-label="seeMore" h={4} variant="none" bgColor="transparent" boxShadow="none" />
                                    </Tooltip> 
                                    </Text>
                                }
                        </InputGroup>
                        <FormLabel mt={6} >Confirmer le mot de passe</FormLabel>
                        <InputGroup size='md'  zIndex={0}>
                            <Input name="passwordConfirmation" zIndex={0} id="passwordConfirmation" type='password' placeholder='Confirmer le nouveau mot de passe' borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                        </InputGroup>
                        <Flex w="100%" justifyContent="flex-end">
                         <Button variant="greenButton" type="submit" mt={6}>
                                Modifier
                            </Button>
                            </Flex>
                    </FormControl>
                </form>
            </Box>
            <Box mx="24px" mt="8px" mb={20} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
              <Center p={2}>
                <Button variant="deleteButton" leftIcon={<Trash2 />}>Supprimer mon compte</Button>
              </Center>
            </Box>
              <Spacer h={4}/>
        </>
    )
}
export default UserProfile;