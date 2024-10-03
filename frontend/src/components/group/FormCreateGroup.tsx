import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Avatar,
  Box,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useCreateGroupMutation } from "@/graphql/generated/schema";
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ApolloError } from "@apollo/client";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useTranslation } from "react-i18next";

type FormCreateGroupProps = {
  onClose: () => void;
  refetch: () => void;
  initialRef?: React.MutableRefObject<null>;
};
export default function FormCreateGroup({
  onClose,
  refetch,
  initialRef,
}: FormCreateGroupProps) {
  /**
   * Creates a new group using the useCreateGroupMutation hook.
   */
  const [createGroup] = useCreateGroupMutation();
  const [memberEmail, setMemberEmail] = React.useState("");
  const [members, setMembers] = useState<{ email: string; color: string }[]>(
    []
  );
  const [groupName, setGroupName] = useState("");
  // These functions are used to validate the user input in the form.
  const { validateEmail, validateGroupName } = useFormValidation();
  const { t } = useTranslation();
  const [errors, setErrors] = useState<{
    groupName?: string[];
    email?: string[];
    generic?: string[];
  }>({});
  const [isHovered, setIsHovered] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);
  const toast = useToast();

  // Colors used to display the members of the group
  const colors = [
    "primary.lowest",
    "secondary.low",
    "tertiary.low",
    "primary.lower",
    "secondary.medium",
    "tertiary.lower",
  ];

  /**
   * Handles the change event of the group name input field.
   * It sets the groupName state and resets the groupName error if the input is valid.
   */
  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGroupName = e.target.value;
    setGroupName(newGroupName);
    if (newGroupName.length >= 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        groupName: [],
        generic: [],
      }));
    }
  };

  /**
   * Handles the change event of the member email input field.
   * It sets the memberEmail state and resets the email error if the input is valid.
   */
  const handleChangeMemberEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMemberEmail = e.target.value;
    setMemberEmail(newMemberEmail);
    // Check if the input is a valid email or empty
    const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
      newMemberEmail
    );
    const isEmpty = newMemberEmail === "";
    if (isValidEmail || isEmpty) {
      setErrors((prevErrors) => ({
        // Reset the email error if the input is valid
        ...prevErrors,
        email: [],
      }));
    }
  };
  /**
   * Handles the click event of the add member button.
   * It validates the input email and adds it to the list of members if it is valid.
   */
  const handleAddMember = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors = validateEmail(
      memberEmail,
      members.map((member) => member.email)
    );
    if (newErrors.length > 0) {
      return setErrors({ ...errors, email: newErrors });
    }
    if (
      memberEmail.trim() !== "" &&
      !members.some((member) => member.email === memberEmail)
    ) {
      const newMember = {
        email: memberEmail,
        color: colors[colorIndex],
      };
      setMembers([...members, newMember]);
      setMemberEmail("");
      setErrors({});
      // Change the color of the next member to be added
      setColorIndex((colorIndex + 1) % colors.length);
    }
  };
  const handleRemoveMember = (
    e: React.MouseEvent<HTMLDivElement>,
    email: string
  ) => {
    e.preventDefault();
    setMembers(members.filter((member) => member.email !== email));
  };
  const handleMouse = () => setIsHovered(!isHovered);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson: any = Object.fromEntries(formData.entries());

    try {
      await createGroup({
        variables: { data: formJson },
      });
      // Refresh the list of groups after creating the new group.
      refetch();
      onClose();
      toast({
        title: t("toast.success.group-created-title"),
        description: t("toast.success.group-created-description", {
          groupName,
        }),
        status: "success",
        variant: "success",
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("GraphQL Error:", error.graphQLErrors);
        handleGraphQLError(error);
      } else {
        console.error(error);
      }
    }
  };

  /**
   * Handle GraphQL errors that can occur during the creation of a group.
   */
  const handleGraphQLError = (error: ApolloError) => {
    const newErrors: { [key: string]: string[] } = {};
    // Iterate over each error returned by the GraphQL server.
    error.graphQLErrors.forEach((err) => {
      if (err.message.includes("Argument Validation Error")) {
        newErrors.groupName = validateGroupName(groupName);
      } else if (
        err.message.includes("A group with this name already exists for you")
      ) {
        newErrors.groupName = [t("validate-data.group-name", { groupName })];
      } else {
        const descriptionError = t("toast.error.create-group");
        toast({
          title: t("toast.error.generic-title"),
          description: descriptionError,
          status: "error",
          variant: "error",
        });
        newErrors.generic = [...(newErrors.generic || []), descriptionError];
      }
    });
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between"
    >
      <Box>
        <FormControl
          isRequired
          isInvalid={errors.groupName && errors.groupName.length > 0}
          mt={3}
        >
          <FormLabel>{t("group-name")}</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder={t("placeholder-name-your-group")}
            variant="goldenInput"
            ref={initialRef}
            value={groupName}
            onChange={handleChangeGroupName}
          />
          {errors.groupName &&
            errors.groupName.map((error, index) => (
              <FormErrorMessage key={index} color="tertiary.medium">
                {error}
              </FormErrorMessage>
            ))}
        </FormControl>
        <FormControl mt={3} isInvalid={errors.email && errors.email.length > 0}>
          <FormLabel>{t("add-members")}</FormLabel>
          <Flex>
            <Input
              type="email"
              placeholder={t("placeholder-add-member-email")}
              variant="goldenInput"
              value={memberEmail}
              onChange={handleChangeMemberEmail}
            />
            <Button
              variant="transparentButton"
              onMouseEnter={handleMouse}
              onMouseLeave={handleMouse}
              onClick={handleAddMember}
              marginBlock="auto"
              size="md"
              p={0}
              ml={3}
            >
              <Plus color={isHovered ? "#AA7124" : "#724421"} />
            </Button>
          </Flex>

          {errors.email &&
            errors.email.map((error, index) => (
              <FormErrorMessage key={index} color="tertiary.medium">
                {error}
              </FormErrorMessage>
            ))}
        </FormControl>
        <Box
          mt={6}
          p={2}
          borderWidth="1px"
          borderRadius="3xl"
          borderColor="secondary.low"
          h={150}
          overflowY="auto"
          sx={{
            "::-webkit-scrollbar": {
              width: "0.9rem",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "secondary.low",
              borderRadius: "1rem",
              border: "0.4rem solid transparent",
              backgroundClip: "padding-box",
            },
            "::-webkit-scrollbar-track": {
              marginBlock: "1.2rem",
            },
          }}
        >
          {members.length ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Display the list of members added to the group */}
              {members.map((member, index) => (
                <Box key={index} display="flex" marginInline={1} gap={1}>
                  <Avatar size="xs" bg={member.color} name={member.email} />
                  <Text>{member.email}</Text>

                  <Box
                    as="button"
                    onClick={(event: any) =>
                      handleRemoveMember(event, member.email)
                    }
                    ml="auto"
                  >
                    <Trash2 color="#A10702" size={18} />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      </Box>
      <Flex justifyContent="flex-end" mt={4}>
        <Button variant="whiteRedButton" mr={3} onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button type="submit" variant="greenButton">
          {t("create")}
        </Button>
      </Flex>
    </form>
  );
}
