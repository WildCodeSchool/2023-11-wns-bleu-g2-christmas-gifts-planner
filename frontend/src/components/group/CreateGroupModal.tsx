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

type CreateGroupModalProps = {
  refetch: () => void;
};
export default function CreateGroupModal({ refetch }: CreateGroupModalProps) {
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
        <ModalContent bg="secondary.lowest" py={3}>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column">
            <FormCreateGroup onClose={onClose} refetch={refetch} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
