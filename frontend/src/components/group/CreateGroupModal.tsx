import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import FormCreateGroup from "@/components/group/FormCreateGroup";

export default function CreateGroupModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="goldenButton">
        Créer un groupe
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <FormCreateGroup />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
