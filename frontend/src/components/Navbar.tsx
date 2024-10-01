import {
  Box,
  Flex,
  Image,
  Button,
  IconButton,
  useColorMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import {
  useProfileQuery,
  useLogoutMutation,
  useDeleteGroupMutation,
  useGroupByIdQuery,
} from "@/graphql/generated/schema";
import i18n from "@/pages/i18n";
import { useTranslation } from "react-i18next";
import { useGroupContext } from "@/contexts/GroupContext";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [language, setLanguage] = useState("FR");
  const { t } = useTranslation();
  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });
  const { groupId, ownerId } = useGroupContext();
  console.log("groupId: ", groupId);
  const isOwner =
    currentUser?.profile?.id &&
    ownerId &&
    currentUser.profile.id.toString() === ownerId.toString();
  console.log("isOwner: ", isOwner);
  const [deleteGroup] = useDeleteGroupMutation();
  const handleLogin = () => {
    router.push("/login");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (lang === "FR") {
      i18n.changeLanguage("fr");
    } else if (lang === "EN") {
      i18n.changeLanguage("en-US");
    }
  };

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      if (groupId !== null) {
        await deleteGroup({ variables: { groupId: groupId } });
        router.push("/dashboard");
      } else {
        console.error("groupId is null");
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete group", error);
    }
  };

  return (
    <Box as="nav" bg="primary.high" color="white" padding="4" mb={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/" passHref>
          <Image
            src="/Gifty-logo-white.svg"
            alt="Gifty Logo"
            height="40px"
            className="logo"
            css={{
              transition: "filter 0.2s ease",
              "&:hover": {
                filter:
                  "invert(56%) sepia(39%) saturate(2143%) hue-rotate(2deg) brightness(93%) contrast(92%)",
              },
            }}
          />
        </Link>
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              colorScheme="white"
              mr="4"
              _hover={{
                textDecoration: "none",
                color: "secondary.medium",
              }}
            >
              {language}
            </MenuButton>
            <MenuList minWidth="50px">
              <MenuItem
                color="primary.high"
                _hover={{ bg: "secondary.low" }}
                fontWeight="bold"
                onClick={() => handleLanguageChange("FR")}
              >
                FR
              </MenuItem>
              <MenuItem
                color="primary.high"
                _hover={{ bg: "secondary.low" }}
                fontWeight="bold"
                onClick={() => handleLanguageChange("EN")}
              >
                EN
              </MenuItem>
            </MenuList>
          </Menu>

          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr="4"
          />

          {!currentUser ? (
            <Button
              colorScheme="white"
              variant="outline"
              _hover={{
                textDecoration: "none",
                color: "secondary.medium",
              }}
              onClick={handleLogin}
            >
              {t("sign-in")}
            </Button>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar
                  name={
                    currentUser?.profile.firstName &&
                    currentUser?.profile.lastName
                      ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}`
                      : undefined
                  }
                  size="md"
                  _hover={{
                    cursor: "pointer",
                  }}
                />
              </MenuButton>
              <MenuList>
                <Box textAlign="center" p={2}>
                  <Flex flexDirection="column">
                    <MenuItem
                      color="primary.high"
                      _hover={{ bg: "secondary.low" }}
                      onClick={() => router.push("/profile")}
                    >
                      {t("nav-my-profile")}
                    </MenuItem>
                    <MenuItem
                      color="primary.high"
                      _hover={{ bg: "secondary.low" }}
                      onClick={() => router.push("/dashboard")}
                    >
                      {t("nav-my-groups")}
                    </MenuItem>
                  </Flex>
                </Box>
                <MenuDivider />
                <Box textAlign="center" p={4}>
                  <Flex flexDirection="column">
                    <Button
                      mb={4}
                      variant="goldenButton"
                      onClick={() => router.push("/create-group")}
                    >
                      {t("create-group")}
                    </Button>
                    {isOwner && (
                      <Button
                        mb={4}
                        variant="redButton"
                        onClick={handleDeleteGroup}
                      >
                        {t("button.delete-group")}
                      </Button>
                    )}

                    <Button variant="greenButton" onClick={handleLogout}>
                      {t("sign-out")}
                    </Button>
                  </Flex>
                </Box>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
