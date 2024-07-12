import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Avatar,
  InputRightElement,
  InputGroup,
  Box,
  Text,
} from "@chakra-ui/react";
import { useCreateGroupMutation } from "@/graphql/generated/schema";
import React, { useState } from "react";
import { UserRoundPlus, X } from "lucide-react";

type FormCreateGroupProps = {
  onClose: () => void;
  refetch: () => void;
};
export default function FormCreateGroup({
  onClose,
  refetch,
}: FormCreateGroupProps) {
  /**
   * Creates a new group using the useCreateGroupMutation hook.
   */
  const [createGroup] = useCreateGroupMutation();
  const [memberEmail, setMemberEmail] = React.useState("");
  const [members, setMembers] = useState<{ email: string; color: string }[]>(
    []
  );
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

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
   * Handles form submission, sends a mutation to create a new group
   * and refreshes the list of groups using refetch.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setMemberEmail(event.target.value);

  const validateEmail = (email: string) => {
    //
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const handleAddMember = () => {
    if (!validateEmail(memberEmail)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }
    if (members.some((member) => member.email === memberEmail)) {
      setError("Cet e-mail est déjà ajouté.");
      return;
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
      setError("");

      // Change the color of the next member to be added
      setColorIndex((colorIndex + 1) % colors.length);
    }
  };
  const handleRemoveMember = (email: string) => {
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
        variables: {
          ...formJson,
          members: members.map((member) => member.email),
        },
      });
      // Refresh the list of groups after creating the new group.
      refetch();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired mt={3}>
        <FormLabel>Nom du groupe</FormLabel>
        <Input
          type="name"
          name="name"
          id="name"
          placeholder="Donnez un nom à votre groupe"
          variant="goldenInput"
        />
      </FormControl>

      <FormControl mt={3} isInvalid={!!error}>
        <FormLabel>Ajouter des membres</FormLabel>
        <InputGroup>
          <Input
            // isInvalid
            type="email"
            placeholder="Ajoutez des membres à votre groupe"
            variant="goldenInput"
            value={memberEmail}
            onChange={handleChange}
          />
          <InputRightElement>
            <Box
              as="button"
              onClick={handleAddMember}
              onMouseEnter={handleMouse}
              onMouseLeave={handleMouse}
            >
              <UserRoundPlus
                color={isHovered ? "#11643C" : "#03110A"}
                size={isHovered ? 24 : 20}
              />
            </Box>
          </InputRightElement>
        </InputGroup>
        {error !== "" && (
          <Text mt={3} fontSize={12} color="tertiary.medium">
            {error}
          </Text>
        )}
      </FormControl>
      {members.length ? (
        <Box
          mt={3}
          p={2}
          borderWidth="1px"
          borderRadius="3xl"
          borderColor="secondary.low"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {/* Display the list of members added to the group */}
          {members.map((member, index) => (
            <Box key={index} display="flex" marginInline={1} gap={1}>
              <Avatar size="xs" bg={member.color} name={member.email} />
              <Text>{member.email}</Text>

              <Box
                as="button"
                onClick={() => handleRemoveMember(member.email)}
                ml="auto"
              >
                <X color="#A10702" />
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}
      <Flex justifyContent="flex-end" mt={4}>
        <Button variant="cancelButton" mr={3} onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" variant="greenButton">
          Créer
        </Button>
      </Flex>
    </form>
  );
}
