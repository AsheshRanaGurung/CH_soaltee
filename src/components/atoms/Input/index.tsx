import {
  Input as ChakraInput,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface IInput extends InputProps {
  label?: string;
  helperText?: string;
  error?: any;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  isRequired?: boolean;
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
  endIcons?: React.ReactNode;
  onIconClick?: () => void;
  required?: boolean;
  labelDisabled?: string;
  variant?: string;
  label_color?: string;
}

const Input = ({
  label,
  helperText,
  name,
  error,
  rules,
  register,
  isDisabled,
  labelDisabled,
  isRequired,
  type,
  startIcon,
  endIcons,
  onIconClick,
  required,
  variant,
  label_color,
  ...rest
}: IInput) => {
  return (
    <FormControl
      isInvalid={!!error}
      isRequired={isRequired}
      isDisabled={isDisabled}
      variant={variant}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          fontWeight={500}
          fontSize={"14px"}
          m={0}
          color={label_color}
        >
          {label}
          {required && <span style={{ color: "red" }}>&nbsp;*</span>}
        </FormLabel>
      )}

      {labelDisabled && (
        <FormLabel htmlFor={name} fontWeight={500} fontSize={"14px"} m={0}>
          {labelDisabled}
        </FormLabel>
      )}

      <InputGroup>
        <ChakraInput
          id={name}
          type={type}
          height={"30px"}
          padding={0}
          border={`1px solid ${colors.primary_dark}`}
          _placeholder={{
            fontSize: "sm",
            fontWeight: "400",
            lineHeight: "lg",
          }}
          sx={{
            border: "none",
            borderBottom: " 1px solid rgba(0, 0, 0, 0.15)",
            borderRadius: "0",
            marginBottom: "20px",
            padding: 0,
          }}
          _focusVisible={{
            borderBottom: `1px solid ${colors.primary_dark} `,
            borderRadius: "0",
          }}
          _invalid={{
            borderBottom: `1px solid ${colors.red} `,
            borderRadius: "0",
          }}
          {...register(name, rules)}
          {...rest}
        />
        {endIcons && (
          <InputRightElement onClick={onIconClick}>
            {endIcons}
          </InputRightElement>
        )}
      </InputGroup>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && (
        <FormErrorMessage mt={"-10px"} mb={2} fontSize={"12px"}>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Input;
