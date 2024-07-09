import React from "react";
import { FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import { useCreateGroupMutation } from "@/graphql/generated/schema";

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

  /**
   * Handles form submission, sends a mutation to create a new group
   * and refreshes the list of groups using refetch.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson: any = Object.fromEntries(formData.entries());
    try {
      await createGroup({ variables: { data: formJson } });
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
      <FormControl mt={3}>
        <FormLabel>Ajouter des membres</FormLabel>
        <Input
          type="text"
          placeholder="Ajoutez des membres à votre groupe"
          variant="goldenInput"
        />
      </FormControl>
      <Flex justifyContent="flex-end" mt={4}>
        <Button variant="greenButton" mr={3} onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit" variant="goldenOutline">
          Créer
        </Button>
      </Flex>
    </form>
  );
}
