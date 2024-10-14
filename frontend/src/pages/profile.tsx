import client from "@/graphql/client";
import { useDeleteUserMutation, useProfileQuery, useUpdateUserMutation } from "@/graphql/generated/schema";
import isDefined from "@/types/isDefined";
import isValidNotEmptyString from "@/types/isValidNotEmptyString";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, Flex, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Link, Spacer, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { ArrowLeft, Eye, EyeOff, InfoIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";


const UserProfile = () => {
    const [arrayOfErrors, setArrayOfErrors] = useState<string[]>([])
    const [error, setError] = useState<string | number>(0);
    const [showOld, setShowOld] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    
    const [updateUser] = useUpdateUserMutation();
    const toast = useToast();
    const router = useRouter()
    const { t } = useTranslation()
    
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

    const { data: currentUser } = useProfileQuery({
      errorPolicy: "ignore",
    });
    const [deleteUser] = useDeleteUserMutation({
      variables: { userId: parseInt(currentUser!.profile.id)}
       }
    );

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
          title: t("success-profile-modified"),
          description: t("description-success-profile-modified"),
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
          title: t("success-password-modified"),
          description: t("description-success-password-modified"),
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

  const handleDelete = () => {
    deleteUser();
    onClose();
  };

    return(
        <>
        <Link href='/dashboard'>
            <IconButton aria-label="Back" bg="transparent" boxShadow="none" _hover={{ bg: "gray.200" }} icon={<ArrowLeft color="#22543D"/>}/>
        </Link>
        <Center>
            <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
                <form onSubmit={handleSubmitProfile}>
                  <Text fontWeight="bold">{t("modify-profile")}</Text>
                    <FormControl mt={6}>
                        {/* Firstname and lastname */}
                                <FormLabel >{t("lastname")}</FormLabel>
                                <Input type="text" name="lastName" id="lastName" variant="goldenInput" fontSize={14} minLength={2} maxLength={30} placeholder={isValidNotEmptyString(currentUser?.profile.lastName)? currentUser!.profile.lastName! : t("lastname")} width="100%" borderRadius={20} borderColor="green.600" onChange={handleChange} value={formData.lastName}/>                        
                        <FormLabel mt={4} >{t("firstname")} </FormLabel>
                                <Input type="text" name="firstName" id="firstName" variant="goldenInput" fontSize={14} minLength={2} maxLength={30} placeholder={isValidNotEmptyString(currentUser?.profile.firstName)? currentUser!.profile.firstName! : t("firstname")} width="100%" borderRadius={20} borderColor="green.600" onChange={handleChange} value={formData.firstName}/>
                                {/* Email */}
                        {error === 2 &&
                                <Text position="absolute" fontSize={14} fontWeight="bold" color="red.700">{t("email-already-existing")}</Text>
                                }
                                <FormLabel mt={4}>{t("email-adress")}</FormLabel>
                        <Input type='email' id="email" data-testid="label-email" name="email" variant="goldenInput" placeholder={isValidNotEmptyString(currentUser?.profile.email) ? currentUser!.profile.email : t("email-adress")} borderRadius={20} borderColor={error === 2 ? "red.700" : "green.600"} onChange={handleChange} value={formData.email}/>
                         </FormControl>
                         <Flex w="100%" justifyContent="flex-end">
                         <Button variant="greenButton" mt={6} type="submit">
                                {t("modify")}
                            </Button>
                            </Flex>
                </form>
                </Box>
                </Center>
                         {/* Old Password */}
                         <Center>
                         <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
                         <form onSubmit={handleSubmitPassword}>
                         <Text fontWeight="bold">{t("modify-password")}</Text>
                         <FormControl mt={6}>
                         <FormLabel >{t("current-password")} </FormLabel>
                         <InputGroup size='md'>
                            <Input name="oldPassword" id="oldPassword" fontSize={14} type={showOld ? "text":'password'} variant="goldenInput" placeholder={t("old-password")} borderRadius={15} borderColor={error === 3 ? "red.700" : "green.600"} onChange={handleChange}/>
                            <InputRightElement>
                            <IconButton
                              aria-label={showOld ? t("hide-password") : t("show-password")}
                              variant="ghost"
                                boxShadow="none"
                              icon={showOld ? <EyeOff /> : <Eye />}
                              onClick={() => setShowOld(!showOld)}
                                />
                            </InputRightElement>
                            {error === 3 &&
                                <Text position="absolute" mt={10} fontSize={14} fontWeight="bold" color="red.700">{t("modify-password-is-different")}</Text>
                                }
                        </InputGroup>
                        {/* New Password and confirm Password */}
                        <FormLabel mt={6}>{t("new-password")} </FormLabel>
                        <InputGroup size='md' >
                            <Input name="newPassword" id="newPassword" fontSize={14} type={showNew ? "text":'password'} variant="goldenInput" placeholder={t("new-password")} borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                            <InputRightElement>
                            <IconButton
                              aria-label={showNew ? t("hide-password") : t("show-password")}
                              variant="ghost"
                                boxShadow="none"
                              icon={showNew ? <EyeOff /> : <Eye />}
                              onClick={() => setShowNew(!showNew)}
                                />
                            </InputRightElement>
                            {error === 1 &&
                                <Text position="absolute" mt={10} fontSize={14} fontWeight="bold" color="red.700">{t("passwords-are-not-equals")}</Text>
                                }
                            {error === 4 && <Text position="absolute" mt={10} fontSize={14} fontWeight="bold" color="red.700" >{t("unauthorized-password")}
                                    <Tooltip label={arrayOfErrors.map((error, index) => (<Text key={index} fontSize={12}>{error}</Text>))} >
                                        <IconButton icon={<InfoIcon height={22}/>} aria-label="seeMore" h={4} variant="none" bgColor="transparent" boxShadow="none" />
                                    </Tooltip> 
                                    </Text>
                                }
                        </InputGroup>
                        <FormLabel mt={6} >{t("confirm-password")}</FormLabel>
                        <InputGroup size='md'  zIndex={0}>
                            <Input name="passwordConfirmation" zIndex={0} fontSize={14} id="passwordConfirmation" variant="goldenInput" type={showConfirm ? "text":'password'} placeholder={t("confirm-new-password")} borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
                            <InputRightElement>
                            <IconButton
                              aria-label={showConfirm ? t("hide-password") : t("show-password")}
                              variant="ghost"
                                boxShadow="none"
                              icon={showConfirm ? <EyeOff /> : <Eye />}
                              onClick={() => setShowConfirm(!showConfirm)}
                                />
                            </InputRightElement>
                        </InputGroup>
                        <Flex w="100%" justifyContent="flex-end">
                         <Button variant="greenButton" mt={6} type="submit">
                                {t("modify")}
                            </Button>
                            </Flex>
                    </FormControl>

                </form>
            </Box>
            </Center>
              <Center p={2} mt={4}>
                <Button variant="redButton" leftIcon={<Trash2 />} onClick={onOpen}>{t("delete-account")}</Button>
              </Center>
              <Spacer h={4}/>
              <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("delete-account-confirm-title")}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t("delete-account-confirm-message")}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t("return")}
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                {t("yes-delete-it")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </>
        
    )
}
export default UserProfile;