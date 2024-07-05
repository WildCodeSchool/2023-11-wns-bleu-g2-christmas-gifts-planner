import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
  Box,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";

export default function FormCreateGroup() {
  return (
    <form action="submit">
      <FormControl isRequired>
        <FormLabel>Nom du groupe</FormLabel>
        {/* <Input
          type="name"
          placeholder=""
          focusBorderColor="secondary.medium"
          borderColor="secondary.low"
          rounded={50}
          _hover={{ borderColor: "secondary.medium" }}
        /> */}
        <Input
          type="name"
          placeholder="Donnez un nom à votre groupe"
          focusBorderColor="secondary.medium"
          borderColor="primary.hightest"
          rounded={50}
          _hover="none"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Ajouter des membres</FormLabel>
        <Input
          type="name"
          placeholder="Ajoutez des membres à votre groupe"
          focusBorderColor="secondary.medium"
          borderColor="primary.hightest"
          rounded={50}
          _hover="none"
        />
      </FormControl>
      <Flex justifyContent="flex-end">
        <Button variant="greenButton" mr={3}>
          Annuler
        </Button>
        <Button variant="goldenOutline">Créer</Button>
      </Flex>
    </form>
  );
}
