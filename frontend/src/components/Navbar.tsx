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
  useToast,
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
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { useGroupContext } from "@/contexts/GroupContext";
import ConfirmModal from "./ConfirmModal";
import CreateGroupModal from "@/components/group/CreateGroupModal";

export default function Navbar({
  onGroupDeleted,
}: {
  onGroupDeleted: () => void;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const [language, setLanguage] = useState("FR");
  const { t } = useTranslation();
  const { data: currentUser,refetch, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
  const { groupId, ownerId, groupName } = useGroupContext();

  const isOwner =
    currentUser?.profile?.id &&
    ownerId &&
    currentUser.profile.id.toString() === ownerId.toString();

  const [deleteGroup] = useDeleteGroupMutation();
  const toast = useToast();

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
      await client.resetStore();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      if (groupId !== null) {
        await deleteGroup({ variables: { groupId: Number(groupId) } });
        router.push("/dashboard");
        onGroupDeleted();
        toast({
          title: t("toast.success.delete-group-title"),
          description: t("toast.success.delete-group-description", {
            groupName,
          }),
          status: "success",
          variant: "success",
        });
      } else {
        console.error("groupId is null");
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete group", error);
      toast({
        title: t("toast.error.generic-title"),
        description: t("toast.error.generic-description"),
        status: "error",
        variant: "error",
      });
    }
  };

  return (
    <Box as="nav" bg="primary.high" color="white" padding="4" mb={16}>
      <Flex justifyContent="space-between" alignItems="center">
        <Link href="/" passHref>
          <Image
            src="/Gifty-logo-white.svg"
            alt="Gifty Logo"
            height="50px"
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
              h={"40px"}
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
                  <Flex flexDirection="column" gap={4}>
                  <CreateGroupModal refetch={refetch} />
                  {isOwner &&
                      router.query.id?.toString() === groupId?.toString() && (
                        <ConfirmModal
                          handleClick={handleDeleteGroup}
                          openAlertAction={t("button.delete-group")}
                          content={t("alert.delete-group")}
                          title={t("alert.delete-group-title")}
                          primaryAction={t("button.delete")}
                          secondaryAction={t("button.cancel")}
                          variant={["redButton", "whiteRedButton", "redButton"]}
                        />
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
