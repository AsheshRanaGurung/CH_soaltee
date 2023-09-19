import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { FC } from "react";

interface IModal {
  children: React.ReactNode;
  title?: string;
  isModalOpen: boolean;
  onCloseModal: () => void;
  height?: string;
  width?: string;
}

const ModalForm: FC<IModal> = ({
  children,
  title,
  isModalOpen,
  onCloseModal,
  height,
  width,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalOverlay
        style={{ height: height || "100%", width: width || "100%" }}
      />
      <ModalContent>
        <ModalHeader borderBottom={`1px solid ${colors.light_gray_1}`}>
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={8} py={5}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
