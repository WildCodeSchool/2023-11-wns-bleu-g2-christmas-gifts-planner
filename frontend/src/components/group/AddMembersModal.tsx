import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FormAddMembers from "./FormAddMembers";
import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

type AddMembersModalProps = {
  refetch: () => void;
  id: string;
};
export default function AddMembersModal({ refetch, id }: AddMembersModalProps) {
  const { t } = useTranslation();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [channels, setChannels] = useState<{ email: string; color?: string }[]>([]);
  return (
    <>
      <Button onClick={onOpen} variant="goldenButton">
      {t("add-members")}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={isMobile ? "slideInBottom" : "scale"}
        initialFocusRef={initialRef}
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent
          bg="background.default"
          p={6}
          mb={isMobile ? 0 : "auto"}
          mt="auto"
          _dark={{ bg: "dark.surface10" }}
        >
          <ModalCloseButton />
          <ModalBody p={isMobile ? 0 : "auto"}>
            <FormAddMembers
              onClose={onClose}
              refetch={refetch}
              initialRef={initialRef}
              id={id}
              setChannels={setChannels} // Passez la fonction setChannels
            channels={channels}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
