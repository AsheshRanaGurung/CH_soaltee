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
import { colors } from "@src/theme/colors";
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
  showFooter?: boolean;
  disabled?: boolean;
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
  disabled,
  handleSubmit,
  showFooter,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalOverlay style={{ height: "100%", width: "100%" }} />
      <ModalContent>
        {!showFooter ? (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
          </>
        ) : (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              submitHandler?.();
            }}
          >
            <ModalHeader borderBottom={`1px solid ${colors.light_gray_1}`}>
              {title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody px={8} py={5}>
              {children}
            </ModalBody>

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
                onClick={() => {
                  handleSubmit?.();
                  // onCloseModal();
                }}
                isDisabled={disabled}
                size={"md"}
                isLoading={isLoading}
              >
                {submitButtonText}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
