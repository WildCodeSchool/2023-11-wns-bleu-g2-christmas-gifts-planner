import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
export default function ConfirmModal({
  handleClick,
  openAlertAction,
  content,
  title,
  primaryAction,
  secondaryAction,
  variant,
}: {
  handleClick: () => void;
  openAlertAction: string;
  content: string;
  title: string;
  primaryAction: string;
  secondaryAction: string;
  variant: string[];
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button variant={variant[0]} onClick={onOpen}>
        {openAlertAction}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor={"background.default"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{content}</AlertDialogBody>

            <AlertDialogFooter>
              <Button variant={variant[1]} ref={cancelRef} onClick={onClose}>
                {secondaryAction}
              </Button>
              <Button
                variant={variant[2]}
                colorScheme="red"
                onClick={() => {
                  onClose();
                  handleClick();
                }}
                ml={3}
              >
                {primaryAction}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
