import { useAddMemberToGroupMutation } from "@/graphql/generated/schema";
import { ApolloError } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Plus, X } from "lucide-react";
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

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setMemberEmail(event.target.value);

  const validateEmail = (email: string) => {
    //
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleAddMember = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("GraphQL Error:", error.graphQLErrors);
      } else {
        console.error("Error adding members to group: ", error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between"
    >
      <Box>
        <FormControl mt={3} isInvalid={!!error}>
          <FormLabel>Ajouter des membres</FormLabel>
          <Flex>
            <Input
              type="email"
              placeholder="Saisissez l'email d'un membre à ajouter"
              variant="goldenInput"
              value={memberEmail}
              onChange={handleChange}
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

          {error !== "" && (
            <Text
              position="absolute"
              mt={1}
              fontSize={12}
              color="tertiary.medium"
            >
              {error}
            </Text>
          )}
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
                    <X color="#A10702" size={20} />
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
