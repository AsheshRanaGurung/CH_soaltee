import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  isModalOpen: boolean;
  onCloseModal: () => void;
  submitHandler?: () => void;
  resetButtonText?: string;
  submitButtonText?: string;
  handleSubmit?: () => void;
  modalSize?: "modal-xl" | "modal-md" | "modal-sm";
  height?: string;
  overflowY?: "auto" | "visible";
  view?: boolean;
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
  handleSubmit,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalOverlay style={{ height: "100%", width: "100%" }} />
      <ModalContent>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            submitHandler?.();
          }}
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {view ? (
              <></>
            ) : (
              <Button variant="reset" mr={3} onClick={onCloseModal} size={"md"}>
                {resetButtonText}
              </Button>
            )}
            <Button
              type="submit"
              onClick={() => {
                onCloseModal();
                handleSubmit?.();
              }}
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
