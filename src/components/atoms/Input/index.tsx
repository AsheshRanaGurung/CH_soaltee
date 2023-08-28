import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  TextareaProps,
} from "@chakra-ui/react";
import { colors } from "@soaltee-loyalty/theme/colors";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps {
  name: string;
  control: Control<any>;
  type: string;
  label?: string;
  error?: any;
  required?: boolean;
  register: UseFormRegister<any>;
  helperText?: string;
  isRequired?: boolean;
  disabled?: boolean;
  variant?: string;
  noFloating?: boolean;
  onError?: string;
  onCustomChange?: () => void;
  onAdditionalChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showError?: boolean;
  inputFocus?: boolean;
}
const TextInput: React.FC<TextInputProps & InputProps & TextareaProps> = ({
  name,
  control,
  label,
  type,
  register,
  helperText,
  required,
  isRequired,
  disabled,
  variant,
  onError,
  noFloating,
  showError,
  inputFocus,
  onCustomChange,
  error,
  onAdditionalChange,
  ...extraProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              variant={"Flushed"}
              id={name}
              isRequired={!!isRequired}
              isInvalid={!!error}
              marginBottom={4}
            >
              {label && (
                <FormLabel
                  htmlFor={name}
                  fontWeight={600}
                  fontSize={"14px"}
                  m={0}
                >
                  {label}
                  {required && <span style={{ color: "red" }}>&nbsp;*</span>}
                </FormLabel>
              )}
              <InputGroup height={type !== "textarea" ? "30px" : "auto"}>
                <Input
                  paddingLeft="0"
                  placeholder={label}
                  type={type}
                  {...register(name)}
                  height={"inherit"}
                  onChange={(e) => {
                    onChange(e);
                    if (onCustomChange !== undefined) {
                      onCustomChange();
                    }
                    if (onAdditionalChange !== undefined) {
                      onAdditionalChange(e);
                    }
                  }}
                  value={value ?? ""}
                  isInvalid={!!error}
                  errorBorderColor={"gray.100"}
                  disabled={disabled}
                  variant={variant}
                  {...extraProps}
                  sx={{
                    border: "none",
                    borderBottom: " 1px solid rgba(0, 0, 0, 0.15)",
                    borderRadius: "0",
                    marginBottom: "10px",
                  }}
                  _focusVisible={{
                    borderBottom: `1px solid ${colors.primary} `,
                    borderRadius: "0",
                  }}
                />
              </InputGroup>

              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  );
};
export default TextInput;
