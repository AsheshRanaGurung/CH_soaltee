import { Box, Button } from "@chakra-ui/react";
import { FC } from "react";

interface IModal {
  isLoading?: boolean;
  onCloseModal?: () => void;
  resetButtonText?: string;
  submitButtonText?: string;
  onClick?: any;
  direction?: any;
}

const ModalFooterForm: FC<IModal> = ({
  isLoading,
  onCloseModal,
  direction,
  resetButtonText,
  submitButtonText,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={direction || "row"}
      mt={8}
      mb={4}
      gap={3}
    >
      {resetButtonText && (
        <Button
          variant="outlined"
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
      >
        {submitButtonText}
      </Button>
    </Box>
  );
};

export default ModalFooterForm;
