import { useAddMemberToGroupMutation } from "@/graphql/generated/schema";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ApolloError } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

type FormAddMembersProps = {
  onClose: () => void;
  refetch: () => void;
  initialRef?: React.MutableRefObject<null>;
  id: string;
};
export default function FormAddMembers({
  onClose,
  refetch,
  initialRef,
  id,
}: FormAddMembersProps) {
  const [addMembers] = useAddMemberToGroupMutation();
  const [memberEmail, setMemberEmail] = React.useState("");
  const [members, setMembers] = useState<{ email: string; color: string }[]>(
    []
  );
  // These functions are used to validate the user input in the form.
  const { validateEmail } = useFormValidation();
  const [errors, setErrors] = useState<{
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
    formJson.members = members.map((member) => ({ email: member.email }));

    try {
      await addMembers({
        variables: {
          groupId: Number(id),
          data: formJson,
        },
      });
      refetch();
      onClose();
      toast({
        title: "Membres ajoutés avec succès",
        description: "Les membres ont été ajoutés avec succès.",
        status: "success",
        variant: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("GraphQL Error:", error.graphQLErrors);
        handleGraphQLError(error);
      } else {
        console.error("Error adding members to group: ", error);
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
      if (err.message.includes(`is already a member`)) {
        const errorMessages = err.message.split(", ");
        errorMessages.forEach((errorMessage) => {
          const [email] = errorMessage.match(/(?<=email\s)(.*)(?=\sis)/) || [];
          if (email) {
            const descriptionError = `L'utilisateur avec l'email ${email} est déjà membre du groupe`;
            toast({
              title: "Erreur d'ajout de membre",
              description: descriptionError,
              status: "error",
              variant: "error",
              duration: 9000,
              isClosable: true,
            });
            newErrors.generic = [
              ...(newErrors.generic || []),
              descriptionError,
            ];
          }
        });
      } else {
        const descriptionError =
          "Une erreur est survenue lors de l'ajout des membres au groupe";
        toast({
          title: "Erreur",
          description: descriptionError,
          status: "error",
          variant: "error",
          duration: 9000,
          isClosable: true,
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
        <FormControl mt={3} isInvalid={errors.email && errors.email.length > 0}>
          <FormLabel>Ajouter des membres</FormLabel>
          <Flex>
            <Input
              type="email"
              placeholder="Saisissez l'email d'un membre à ajouter"
              variant="goldenInput"
              value={memberEmail}
              onChange={handleChangeMemberEmail}
              ref={initialRef}
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
                    onClick={(event) => handleRemoveMember(event, member.email)}
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
          Annuler
        </Button>
        <Button type="submit" variant="greenButton">
          Ajouter
        </Button>
      </Flex>
    </form>
  );
}
