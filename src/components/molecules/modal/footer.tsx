import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface IModal {
  isLoading?: boolean;
  onCloseModal: () => void;
  resetButtonText?: string;
  submitButtonText?: string;
  onApprove?: any;
}

const ModalFooterForm: FC<IModal> = ({
  isLoading,
  onCloseModal,
  resetButtonText,
  submitButtonText,
}) => {
  return (
    <>
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

      <Button
        type="submit"
        borderRadius="0"
        w="100%"
        size={"md"}
        isLoading={isLoading}
      >
        {submitButtonText}
      </Button>
    </>
  );
};

export default ModalFooterForm;
