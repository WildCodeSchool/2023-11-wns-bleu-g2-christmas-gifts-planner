import {
  Box,
  Button,
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
        <Box
        display="flex"
        justifyContent={ "center"} 
        alignItems={ "center"}
        height={"60px"}
      >
        <Button onClick={onOpen} variant="goldenButton">
          Ajouter des membres
        </Button>
      </Box>

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
