import { Box, Flex, Image, Button, IconButton, useColorMode, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const currentRoute = router.pathname;
  const [language, setLanguage] = useState('FR');

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };


  return (
    <Box as="nav" bg="primary.hightest" color="white" padding="4">
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/" passHref>
          <Image
            src="/Gifty-logo-white.svg"
            alt="Gifty Logo"
            height="40px"
            _hover={{
              textDecoration: 'none',
              color: 'secondary.medium',
            }}
          />
        </Link>        
        
        <Flex alignItems="center">
            <Menu>
                <MenuButton as={Button} variant="outline" colorScheme="white" mr="4"
                    _hover={{
                        textDecoration: 'none',
                        color: 'secondary.medium',
                    }}
                    >
                    {language}
                </MenuButton>
                <MenuList minWidth="50px">
                    <MenuItem  color='primary.hightest' fontWeight='bold' onClick={() => handleLanguageChange('FR')}>FR</MenuItem>
                    <MenuItem  color='primary.hightest' fontWeight='bold' onClick={() => handleLanguageChange('EN')}>EN</MenuItem>
                </MenuList>
            </Menu>

          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr="4"
          />

          {currentRoute === "/login" || currentRoute === "/signup" ? (
            <Button colorScheme="white" variant="outline"
              _hover={{
                textDecoration: 'none',
                color: 'secondary.medium',
              }}
              onClick={handleLogin}
            >
              Se connecter
            </Button>
          ) : (
            <Avatar 
                name='Dan Abrahmov' 
                src='https://bit.ly/dan-abramov' 
              size="md" 
              _hover={{
                cursor: 'pointer',
              }}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
