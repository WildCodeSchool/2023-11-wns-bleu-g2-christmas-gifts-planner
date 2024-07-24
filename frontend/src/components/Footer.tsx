import { Box, Flex, Center, UnorderedList, ListItem } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      w="100%"
      bottom="0"
      bg="secondary.lower"
      py={4}
      boxShadow="md"
      mt="1rem"
    >
      <Flex justifyContent="center">
        <Center>
          <UnorderedList display="flex" flexDirection={"column"} spacing={4}>
            <ListItem
              listStyleType="none"
              color="primary.highest"
              fontWeight="bold"
              fontSize="xs"
              _hover={{
                textDecoration: "none",
                color: "secondary.medium",
                cursor: "pointer",
              }}
            >
              Mentions légales
            </ListItem>
            <ListItem
              listStyleType="none"
              color="primary.highest"
              fontWeight="bold"
              fontSize="xs"
            >
              Gifty 2024 Copyright
            </ListItem>
          </UnorderedList>
        </Center>
      </Flex>
    </Box>
  );
}
