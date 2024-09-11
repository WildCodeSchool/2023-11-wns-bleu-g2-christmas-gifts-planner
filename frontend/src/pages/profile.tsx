import client from "@/graphql/client";
import { useProfileQuery, useUpdateUserMutation } from "@/graphql/generated/schema";
import isDefined from "@/types/isDefined";
import isValidNotEmptyString from "@/types/isValidNotEmptyString";
import { Box, Button, Card, CardBody, CardHeader, Center, Flex, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, Link, Spacer, Text, Tooltip, useToast, VStack } from "@chakra-ui/react";
import { ArrowLeft, Cross, Delete, DeleteIcon, Eye, EyeOff, Gift, Icon, InfoIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type WishlistItem = {
  id: string;
  name: string;
  itemURL?: string | null;
}

const UserProfile = () => {
    const [arrayOfErrors, setArrayOfErrors] = useState<string[]>([])
    const [error, setError] = useState<string | number>(0);
    const [showOld, setShowOld] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [updateUser] = useUpdateUserMutation();
    const [name, setName] = useState<string>('');
    const [itemURL, setItemURL] = useState<string>('');
    const toast = useToast();
    const router = useRouter()
    const { t } = useTranslation()
    
    const { data: currentUser } = useProfileQuery({
      errorPolicy: "ignore",
    });
    const [wishlist, setWishlist] = useState<WishlistItem[]>(isDefined(currentUser) ? currentUser!.profile.wishlist : []);
    
    const addItemToWishlist = async () => {
      if (name.trim() === '') {
        toast({
          title: 'Input Required',
          description: 'Please provide a name.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const WishlistItemId = wishlist.length + 1;
      const newItem: WishlistItem = { id: WishlistItemId.toString(), name, itemURL };
      const updatedWishlist = [...wishlist, newItem];
      const cleanedWishlist = updatedWishlist.map((item) => {
        const { __typename, ...rest } = item as WishlistItem & { __typename?: string };
        return rest;
      });
setWishlist(cleanedWishlist)
      try {
        await updateUser({
          variables: {
            data: {
              email: "",
              oldPassword: "",
              newPassword: "",
              firstName: "",
              lastName: "",
              wishlist: cleanedWishlist,
            },
            userId: currentUser!.profile.id,
          },
        });
      } catch (e: any) {
        console.log(e.message);
      }
    
      setName('');
      setItemURL('');
    };
    const removeItemFromWishlist = async (id: number) => {

      const updatedWishlist = wishlist.filter((item) => item.id !== id.toString());
      const cleanedWishlist = updatedWishlist.map((item) => {
        const { __typename, ...rest } = item as WishlistItem & { __typename?: string };
        return rest;
      });
      setWishlist(cleanedWishlist)
      try {
        await updateUser({
          variables: {
            data: {
              email: "",
              oldPassword: "",
              newPassword: "",
              firstName: "",
              lastName: "",
              wishlist: cleanedWishlist,
            },
            userId: currentUser!.profile.id,
          },
        });
        toast({
          title: 'Item Removed',
          description: 'Item has been removed from your wishlist.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } catch (e: any) {
        console.log(e.message);
      }
    };
    
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
      }, [currentUser, error, formData, setFormData, wishlist]);

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

    return(
        <>
        <Link href='/dashboard'>
            <IconButton aria-label="Back" bg="transparent" boxShadow="none" _hover={{ bg: "gray.200" }} icon={<ArrowLeft color="#22543D"/>}/>
        </Link>
        <Center>
        <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
        <VStack spacing={6} align="stretch">
        <Heading as="h2" size="lg" mb={4}>
          My Wishlist
        </Heading>

        <VStack spacing={4} align="stretch">
          <Input
            variant="filled"
            placeholder="Add a gift idea"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            variant="filled"
            placeholder="Add an image URL for the idea"
            value={itemURL}
            onChange={(e) => setItemURL(e.target.value)}
          />

          <Button
            variant="solid"
            colorScheme="teal"
            size="md"
            onClick={addItemToWishlist}
            _hover={{ bg: 'teal.500' }}
          >
            Add to Wishlist
          </Button>
        </VStack>

        {wishlist.length === 0 ? (
          <Text fontSize="lg" color="gray.600">
            Your wishlist is empty.
          </Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {wishlist.map((item) => (
              <Card key={item.id} p={4} bg="gray.50" borderWidth="1px" borderRadius="lg">
                <CardHeader>
                  <Flex align="center">
                    <Gift height="24px" style={{"marginRight": "4px"}} />
                    <Text fontWeight="bold" fontSize="md" flex="1">
                      {item.name}
                    </Text>
                    <Spacer />
                    {item.itemURL && (
                      <Text fontSize="sm" color="blue.500">
                        <Link href={item.itemURL} isExternal>
                          View Gift
                        </Link>
                      </Text>
                    )}
                    <IconButton
                      aria-label="Remove wish"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      ml={4}
                      onClick={() => removeItemFromWishlist(parseInt(item.id))}
                    />
                  </Flex>
                </CardHeader>
              </Card>
            ))}
          </VStack>
        )}
      </VStack>
        </Box>
        </Center>
        <Center>
            <Box mx="24px" mt="8px" p={4} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
                <form onSubmit={handleSubmitProfile}>
                  <Text fontWeight="bold">{t("modify-profile")}</Text>
                    <FormControl mt={6}>
                        {/* Firstname and lastname */}
                                <FormLabel >{t("lastname")}</FormLabel>
                                <Input type="text" name="lastName" id="lastName" fontSize={14} minLength={2} maxLength={30} placeholder={isValidNotEmptyString(currentUser?.profile.lastName)? currentUser!.profile.lastName! : t("lastname")} width="100%" borderRadius={20} borderColor="green.600" onChange={handleChange} value={formData.lastName}/>                        
                        <FormLabel mt={4} >{t("firstname")} </FormLabel>
                                <Input type="text" name="firstName" id="firstName" fontSize={14} minLength={2} maxLength={30} placeholder={isValidNotEmptyString(currentUser?.profile.firstName)? currentUser!.profile.firstName! : t("firstname")} width="100%" borderRadius={20} borderColor="green.600" onChange={handleChange} value={formData.firstName}/>
                                {/* Email */}
                        {error === 2 &&
                                <Text position="absolute" fontSize={14} fontWeight="bold" color="red.700">{t("email-already-existing")}</Text>
                                }
                                <FormLabel mt={4}>{t("email-adress")}</FormLabel>
                        <Input type='email' id="email" data-testid="label-email" name="email" placeholder={isValidNotEmptyString(currentUser?.profile.email) ? currentUser!.profile.email : t("email-adress")} borderRadius={20} borderColor={error === 2 ? "red.700" : "green.600"} onChange={handleChange} value={formData.email}/>
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
                            <Input name="oldPassword" id="oldPassword" fontSize={14} type={showOld ? "text":'password'} placeholder={t("old-password")} borderRadius={15} borderColor={error === 3 ? "red.700" : "green.600"} onChange={handleChange}/>
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
                            <Input name="newPassword" id="newPassword" fontSize={14} type={showNew ? "text":'password'} placeholder={t("new-password")} borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
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
                            <Input name="passwordConfirmation" zIndex={0} fontSize={14} id="passwordConfirmation"  type={showConfirm ? "text":'password'} placeholder={t("confirm-new-password")} borderRadius={15} borderColor={error === 1 || error === 4 ? "red.700" : "green.600"} onChange={handleChange}/>
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
            <Center>
            <Box mx="24px" mt="8px" mb={20} maxW="500px" w="90%" data-testid="card" bgColor="Background" border="1px solid lightgray" borderRadius="12px" boxShadow="2px 2px 2px lightgray">
              <Center p={2}>
                <Button variant="deleteButton" leftIcon={<Trash2 />}>{t("delete-account")}</Button>
              </Center>
            </Box>
        </Center>
              <Spacer h={4}/>
        </>
    )
}
export default UserProfile;