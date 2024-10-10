import { Box, Flex, Center, UnorderedList, ListItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
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
              {t("legal-notices")}
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
