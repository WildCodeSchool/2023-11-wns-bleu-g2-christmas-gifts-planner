import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import FormCreateGroup from "@/components/group/FormCreateGroup";
import React from "react";

type CreateGroupModalProps = {
  refetch: () => void;
};
export default function CreateGroupModal({ refetch }: CreateGroupModalProps) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen} variant="goldenButton">
        Créer un groupe
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={isMobile ? "slideInBottom" : "scale"}
        initialFocusRef={initialRef}
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent
          bg="secondary.lowest"
          p={6}
          mb={isMobile ? 0 : "auto"}
          mt="auto"
        >
          <ModalCloseButton />
          <ModalBody p={isMobile ? 0 : "auto"}>
            <FormCreateGroup
              onClose={onClose}
              refetch={refetch}
              initialRef={initialRef}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
