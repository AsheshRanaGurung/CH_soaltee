import { Box, Button } from "@chakra-ui/react";
import { FC } from "react";

interface IModal {
  isLoading?: boolean;
  onCloseModal?: () => void;
  resetButtonText?: string;
  submitButtonText?: string;
  onClick?: any;
}

const ModalFooterForm: FC<IModal> = ({
  isLoading,
  onCloseModal,
  resetButtonText,
  submitButtonText,
  onClick,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={8}
      mb={4}
    >
      {resetButtonText && (
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
        size={"md"}
        isLoading={isLoading}
        onClick={onClick}
      >
        {submitButtonText}
      </Button>
    </Box>
  );
};

export default ModalFooterForm;
