import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import LegalModal from "./LegalModal";

export default function Footer() {
  return (
    <Box
      as="footer"
      w="100%"
      bottom="0"
      bg="primary.medium"
      py={4}
      boxShadow="md"
      mt="1rem"
      color={"white"}
    >
      <UnorderedList
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        p={{ base: 0, md: 4 }}
        alignItems="center"
      >
        <ListItem
          listStyleType="none"
          color="primary.highest"
          fontWeight="bold"
          fontSize="sm"
        >
          © 2024 Gifty. Tous droits réservés.
        </ListItem>
        <ListItem
          listStyleType="none"
          color="primary.highest"
          fontWeight="bold"
          fontSize="sm"
        >
          Made with ❤️ by the Gifty team.
        </ListItem>
        <LegalModal />
      </UnorderedList>
    </Box>
  );
}
