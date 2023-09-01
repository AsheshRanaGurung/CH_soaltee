import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@chakra-ui/react";
import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  isModalOpen: boolean;
  onCloseModal: () => void;
  submitHandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  resetButtonText?: string;
  submitButtonText?: string;
  modalSize?: "modal-xl" | "modal-md" | "modal-sm";
  height?: string;
  overflowY?: "auto" | "visible";
  view?: boolean;
  onApprove: () => void;
}

const ModalForm: FC<IModal> = ({
  children,
  title,
  view,
  isLoading,
  isModalOpen,
  onCloseModal,
  submitHandler,
  resetButtonText,
  submitButtonText,
  onApprove,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalOverlay style={{ height: "100%", width: "100%" }} />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <Divider orientation="horizontal" />

          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {view ? (
              <></>
            ) : (
              <Button
                variant="outlined"
                mr={3}
                borderRadius="0"
                w="100%"
                onClick={onCloseModal}
                size={"md"}
              >
                {resetButtonText}
              </Button>
            )}
            <Button
              type="submit"
              borderRadius="0"
              w="100%"
              onClick={onApprove}
              size={"md"}
              isLoading={isLoading}
            >
              {submitButtonText}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
