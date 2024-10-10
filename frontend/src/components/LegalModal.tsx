import {
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Gavel } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LegalModal() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  return (
    <>
      <ListItem
        listStyleType="none"
        color="primary.highest"
        fontWeight="bold"
        fontSize="sm"
        onClick={onOpen}
        _hover={{
          textDecoration: "none",
          color: "secondary.medium",
          cursor: "pointer",
        }}
      >
        {t("legal-notices")}
      </ListItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={isMobile ? "slideInBottom" : "scale"}
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        {/* <ModalContent
          bg="background.default"
          p={10}
          mb={isMobile ? 0 : "auto"}
          mt="auto"
        >
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Gifty est une application développée par des élèves de la Wild
              Code School, hébergée sur Vercel. Les interfaces sont créées avec
              Chakra UI, et les illustrations sont fournies par Storyset.
            </Text>
            <Text mt={4}>
              Tous les éléments du site, y compris les images, textes et code,
              sont la propriété des développeurs et ne peuvent être réutilisés
              sans leur autorisation.
            </Text>
          </ModalBody>
        </ModalContent> */}
        <ModalContent
          bg="background.default"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          mb={isMobile ? 0 : "auto"}
          mt="auto"
        >
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            pb={4}
          >
            <Gavel />
            <Text fontSize="lg" fontWeight="bold">
              {t("legal-notices")}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md" mb={4}>
              Gifty est une application développée par des élèves de la Wild
              Code School, hébergée sur Vercel. Les interfaces sont créées avec
              Chakra UI, et les illustrations sont fournies par Storyset.
            </Text>
            <Text fontSize="md">
              Tous les éléments du site, y compris les images, textes et code,
              sont la propriété des développeurs et ne peuvent être réutilisés
              sans leur autorisation.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
