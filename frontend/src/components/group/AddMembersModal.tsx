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
import React from "react";
import FormAddMembers from "./FormAddMembers";
import { AddIcon } from "@chakra-ui/icons";

type AddMembersModalProps = {
  refetch: () => void;
  id: string;
};
export default function AddMembersModal({ refetch, id }: AddMembersModalProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen} variant="goldenButton">
        Ajouter des membres
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
        >
          <ModalCloseButton />
          <ModalBody p={isMobile ? 0 : "auto"}>
            <FormAddMembers
              onClose={onClose}
              refetch={refetch}
              initialRef={initialRef}
              id={id}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
