import { useCompleteProfileMutation } from "@/graphql/generated/schema";
import { ApolloError, useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Check, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import Error from "@/components/Error";
import UnauthorizedImage from "../assets/images/Unauthorized.png";
import Loader from "@/components/Loader";
import { useTranslation } from "react-i18next";
import { useErrorContext } from "@/contexts/ErrorContext";

export default function CompleteProfile() {
  //Get the token from the URL query params
  const router = useRouter();
  const token = router.query.token as string;

  const { messages } = useErrorContext();
  const { t } = useTranslation();
  const client = useApolloClient();

  // Use the useCompleteProfileMutation hook to handle the mutation for completing the profile
  const [CompleteProfile, { error, loading }] = useCompleteProfileMutation({
    onCompleted: () => {
      client.refetchQueries({
        include: ["Profile"],
      });
      toast({
        title: t("toast.success.validate-profile-title"),
        description: t("toast.success.validate-profile-description"),
        status: "success",
        variant: "success",
      });
      router.push("/dashboard");
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    validateLastName,
    validateFirstName,
    validatePassword,
    validateConfirmPassword,
  } = useFormValidation();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<{
    lastName?: string[];
    firstName?: string[];
    email?: string[];
    password?: string[];
    passwordConfirmation?: string[];
  }>({});
  const toast = useToast();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    const newErrors = validateLastName(e.target.value);
    return newErrors.length > 0
      ? setErrors({ ...errors, lastName: newErrors })
      : setErrors({});
  };
  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    const newErrors = validateFirstName(e.target.value);
    return newErrors.length > 0
      ? setErrors({ ...errors, firstName: newErrors })
      : setErrors({});
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const newErrors = validatePassword(e.target.value);
    return newErrors.length > 0
      ? setErrors({ ...errors, password: newErrors })
      : setErrors({});
  };

  const handleChangePasswordConfirmation = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(e.target.value);
    const newErrors = validateConfirmPassword(password, e.target.value);
    return newErrors.length > 0
      ? setErrors({ ...errors, passwordConfirmation: newErrors })
      : setErrors({});
  };

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
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("GraphQL Error:", error.graphQLErrors);
      } else {
        console.error(error);
      }
      toast({
        title: t("toast.error.generic-title"),
        description: t("toast.error.validate-profile"),
        status: "error",
        variant: "error",
      });
    }
  };
  if (error?.message === "Invalid or expired token") {
    return (
      <Error
        image={UnauthorizedImage}
        alt="unauthorized error"
        message={messages?.unauthorized}
      ></Error>
    );
  }

  if (loading) return <Loader></Loader>;
  if (token)
    return (
      <form onSubmit={handleSubmit}>
        <Flex
          direction="column"
          gap={3}
          width={{ base: "95%", md: "48rem" }}
          m="auto"
          marginBlock={4}
        >
          <Card
            paddingBlock={{ base: "0", md: "6" }}
            paddingInline={{ base: "0", md: "32" }}
          >
            <CardHeader pb={0} fontWeight="bold">
              {t("complete-profile")}
            </CardHeader>
            <CardBody>
              <FormControl
                isRequired
                isInvalid={errors.lastName && errors.lastName.length > 0}
                mt={3}
              >
                <FormLabel>{t("lastname")}</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  placeholder={t("placeholder.lastname")}
                  variant="goldenInput"
                  value={lastName}
                  onChange={(e) => handleChangeLastName(e)}
                />
                {errors.lastName &&
                  errors.lastName.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={errors.firstName && errors.firstName.length > 0}
                mt={3}
              >
                <FormLabel>{t("firstname")}</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  placeholder={t("placeholder.firstname")}
                  variant="goldenInput"
                  value={firstName}
                  onChange={(e) => handleChangeFirstName(e)}
                />
                {errors.firstName &&
                  errors.firstName.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))}
              </FormControl>
            </CardBody>
          </Card>
          <Card
            paddingBlock={{ base: "0", md: "6" }}
            paddingInline={{ base: "0", md: "32" }}
          >
            <CardHeader pb={0} fontWeight="bold">
              {t("password-configuration")}
            </CardHeader>
            <CardBody>
              <FormControl
                isRequired
                isInvalid={errors.password && errors.password.length > 0}
                mt={3}
              >
                <FormLabel>{t("password-new")}</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("placeholder.password")}
                    variant="goldenInput"
                    value={password}
                    onChange={(e) => handleChangePassword(e)}
                  />
                  <InputRightElement>
                    <Box as="button" type="button" onClick={toggleShowPassword}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
                {!errors.password ? (
                  <FormHelperText>
                    {t("validate-data.helper-password")}
                  </FormHelperText>
                ) : (
                  errors.password.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={
                  errors.passwordConfirmation &&
                  errors.passwordConfirmation.length > 0
                }
                mt={3}
              >
                <FormLabel>{t("password-confirm")}</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="passwordConfirmation"
                    placeholder={t("placeholder.password")}
                    variant="goldenInput"
                    value={passwordConfirmation}
                    onChange={(e) => handleChangePasswordConfirmation(e)}
                  />
                  <InputRightElement>
                    <Box
                      as="button"
                      type="button"
                      onClick={toggleShowConfirmPassword}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </Box>
                  </InputRightElement>
                </InputGroup>
                {errors.passwordConfirmation &&
                  errors.passwordConfirmation.map((error, index) => (
                    <FormErrorMessage key={index}>{error}</FormErrorMessage>
                  ))}
              </FormControl>
            </CardBody>
          </Card>
          <Flex justify="center">
            <Button type="submit" variant="greenButton" leftIcon={<Check />}>
              {t("button.validate")}
            </Button>
          </Flex>
        </Flex>
      </form>
    );
}
