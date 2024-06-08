import { Box, Flex, Center, Text, UnorderedList, ListItem } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box as="footer" w="100%" my={8}>
            <Flex justifyContent="center">
                <Center>
                    <UnorderedList>
                        <ListItem listStyleType="none" color='primary.highest' fontWeight='bold' fontSize='xs'
                        _hover={{
                            textDecoration: 'none',
                            color: 'secondary.medium',
                            cursor: 'pointer'
                        }}
                        >Mentions légales</ListItem>
                        <ListItem listStyleType="none" color='primary.highest' fontWeight='bold' fontSize={'xs'}
                        >Gifty 2024 Copyright</ListItem>
                    </UnorderedList>

                </Center>
            </Flex>
        </Box>
    );
}
