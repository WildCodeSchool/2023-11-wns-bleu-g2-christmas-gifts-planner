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
  const { t } = useTranslation();
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
  const handleAddMember = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateEmail(memberEmail)) {
      setError(t("add-valid-email"));
      return;
    }
    if (members.some((member) => member.email === memberEmail)) {
      setError(t("email-already-added"));
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
    formJson.members = members.map((member) => member.email);
    console.log("formJson: ", formJson);

    try {
      await createGroup({
        variables: { data: formJson },
      });
      // Refresh the list of groups after creating the new group.
      refetch();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-between"
    >
      <Box>
        <FormControl isRequired mt={3}>
          <FormLabel>{t("group-name")}</FormLabel>
          <Input
            type="name"
            name="name"
            id="name"
            placeholder={t("placeholder-name-your-group")}
            variant="goldenInput"
            ref={initialRef}
          />
        </FormControl>

        <FormControl mt={3} isInvalid={!!error}>
          <FormLabel>{t("add-members")}</FormLabel>
          <InputGroup>
            <Input
              type="email"
              placeholder={t("placeholder-add-members-to-group")}
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
        <Box
          mt={3}
          p={2}
          borderWidth="1px"
          borderRadius="3xl"
          borderColor="secondary.low"
          h={150}
          overflowY="auto"
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
                    onClick={(event : any) => handleRemoveMember(event, member.email)}
                    ml="auto"
                  >
                    <X color="#A10702" />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      </Box>
      <Flex justifyContent="flex-end" mt={4}>
        <Button variant="cancelButton" mr={3} onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" variant="greenButton">
          {t("create")}
        </Button>
      </Flex>
    </form>
  );
}
