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
        {t("legal-notices.title")}
      </ListItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={isMobile ? "slideInBottom" : "scale"}
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent
          bg="background.default"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          mb={isMobile ? 0 : "auto"}
          mt="auto"
          _dark={{ bg: "dark.surface10" }}
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
              {t("legal-notices.title")}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md" mb={4}>
              {t("legal-notices.content")}
            </Text>
            <Text fontSize="md">{t("legal-notices.property")}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
