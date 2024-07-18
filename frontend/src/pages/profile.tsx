import client from "@/graphql/client";
import { useProfileQuery, useUpdateUserMutation } from "@/graphql/generated/schema";
import isDefined from "@/types/isDefined";
import isValidNotEmptyString from "@/types/isValidNotEmptyString";
import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, GridItem, IconButton, Input, InputGroup, InputRightElement, Link, Spacer, Text, Tooltip, useToast } from "@chakra-ui/react";
import { cp } from "fs";
import { ArrowLeft, Eye, EyeOff, InfoIcon, Trash, Trash2 } from "lucide-react";
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
    const [showOld, setShowOld] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
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

      const handleSubmitProfile = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(0);
      setArrayOfErrors([]);
  
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const formJSON: any = Object.fromEntries(formData.entries());
  
      try {
        await updateUser({
          variables: {
            data: {
              firstName: formJSON.firstName,
              lastName: formJSON.lastName,
              email: formJSON.email,
              oldPassword: "",
              newPassword: ""
            },
            userId: currentUser!.profile.id
          }
        });
  
        setFormData({
          ...formData,
          email: formJSON.email ?? currentUser!.profile.email,
          firstName: formJSON.firstName ?? currentUser!.profile.firstName,
          lastName: formJSON.lastName ?? currentUser!.profile.lastName,
          oldPassword: '',
          newPassword: ''
        });
  
        toast({
          title: "Profile modifié !",
          description: "Votre profil a bien été modifié",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e: any) {
        if (e.message === "EMAIL_ALREADY_TAKEN") {
          setError(2);
        }
      } finally {
        client.resetStore();
      }
    };
    const handleSubmitPassword = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(0);
      setArrayOfErrors([]);
  
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const formJSON: any = Object.fromEntries(formData.entries());
  
      if (isDefined(formJSON.newPassword)) {
        const errors = validatePassword(formJSON.newPassword);
        if (formJSON.newPassword !== '' && errors.length > 0) {
          setArrayOfErrors(errors);
          return setError(4);
        } else if (formJSON.newPassword !== formJSON.passwordConfirmation) {
          return setError(1);
        }
      } else {
        console.error("No new password provided");
      }
  
      try {
        await updateUser({
          variables: {
            data: {
              newPassword: formJSON.newPassword,
              oldPassword: formJSON.oldPassword,
              firstName: "",
              lastName: "",
              email: ""
            },
            userId: currentUser!.profile.id
          }
        });
  
        setFormData({
          ...formData,
          email: formJSON.email ?? currentUser!.profile.email,
          firstName: formJSON.firstName ?? currentUser!.profile.firstName,
          lastName: formJSON.lastName ?? currentUser!.profile.lastName,
          oldPassword: '',
          newPassword: ''
        });
  
        toast({
          title: "Mot de passe modifié !",
          description: "Votre mot de passe a bien été modifié",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e: any) {
        if (e.message === "INVALID_OLD_PASSWORD") {
          setError(3);
        }
      } finally {
        client.resetStore();
      }
    };

    return(
        <>
        <Link href='/dashboard'>
            <IconButton aria-label="Back" bg="transparent" boxShadow="none" _hover={{ bg: "gray.200" }} icon={<ArrowLeft color="#22543D"/>}/>
        </Link>
            <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
                <form onSubmit={handleSubmitProfile}>
                  <Text fontWeight="bold">Modifier le profil</Text>
                    <FormControl mt={6}>
                        {/* Firstname and lastname */}
                                <FormLabel >Nom</FormLabel>
                                <Input type="text" name="lastName" id="lastName" minLength={2} maxLength={30} placeholder={isValidNotEmptyString(currentUser?.profile.lastName)? currentUser!.profile.lastName : "Nom"} width="100%" borderRadius={20} borderColor="green.600" onChange={handleChange} value={formData.lastName}/>                        
                        <FormLabel mt={4} >Prénom</FormLabel>
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
                         <form onSubmit={handleSubmitPassword}>
                         <Text fontWeight="bold">Modifier le mot de passe</Text>
                         <FormControl mt={6}>
                         <FormLabel >Mot de passe actuel</FormLabel>
                         <InputGroup size='md'>
                            <Input name="oldPassword" id="oldPassword" type={showOld ? "text":'password'} placeholder='Ancien mot de passe' borderRadius={15} borderColor={error === 3 ? "red.700" : "green.600"} onChange={handleChange}/>
                            <InputRightElement>
                            <IconButton
                              aria-label={showOld ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                              variant="ghost"
                              icon={showOld ? <EyeOff /> : <Eye />}
                              onClick={() => setShowOld(!showOld)}
                                />
                            </InputRightElement>
                            {error === 3 &&
                                <Text position="absolute" mt={10} fontSize={14} fontWeight="bold" color="red.700">Le mot de passe n&apos;est pas le même !</Text>
                                }
                        </InputGroup>
                        {/* New Password and confirm Password */}
                        <FormLabel mt={6}>Nouveau mot de passe</FormLabel>
                        <InputGroup size='md' >
                            <Input name="newPassword" id="newPassword" type={showNew ? "text":'password'} placeholder='Nouveau mot de passe' borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                            <InputRightElement>
                            <IconButton
                              aria-label={showNew ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                              variant="ghost"
                              icon={showNew ? <EyeOff /> : <Eye />}
                              onClick={() => setShowNew(!showNew)}
                                />
                            </InputRightElement>
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
                            <Input name="passwordConfirmation" zIndex={0} id="passwordConfirmation"  type={showConfirm ? "text":'password'} placeholder='Confirmer le nouveau mot de passe' borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                            <InputRightElement>
                            <IconButton
                              aria-label={showConfirm ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                              variant="ghost"
                              icon={showConfirm ? <EyeOff /> : <Eye />}
                              onClick={() => setShowConfirm(!showConfirm)}
                                />
                            </InputRightElement>
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