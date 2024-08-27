import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import FormCreateGroup from "@/components/group/FormCreateGroup";
import React from "react";
import { useTranslation } from "react-i18next";

type CreateGroupModalProps = {
  refetch: () => void;
};
export default function CreateGroupModal({ refetch }: CreateGroupModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const initialRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen} variant="goldenButton">
        {t("create-group")}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent bg="secondary.lowest" p={6} top="">
          <ModalCloseButton />
          <ModalBody>
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
