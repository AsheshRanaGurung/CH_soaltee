import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FormControlProps, IconButton } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import FormControl from "../FormControl";
import { colors } from "@src/theme/colors";

enum Type {
  TEXT = "type",
  PASSWORD = "password",
}

export const PasswordViewIcon = ({
  onToggle,
  isVisible,
}: ISetPasswordViewIcon) => {
  return (
    <IconButton
      aria-label="password"
      onClick={onToggle}
      icon={isVisible ? <ViewIcon /> : <ViewOffIcon />}
      sx={{
        bgColor: "transparent",
        color: colors.primary,
        marginBottom: "10px",
        "&:focus": { outline: "none" },
        "&:hover": {
          bgColor: "transparent",
        },
      }}
    />
  );
};

const Password = ({
  register,
  isVisible,
  error,
  control,
  onToggleVisibility,
  name,
  placeholder,
  ...rest
}: IPassword) => {
  return (
    <FormControl
      control="input"
      register={register}
      size="lg"
      type={isVisible ? Type.TEXT : Type.PASSWORD}
      name={name}
      placeholder={placeholder}
      error={error}
      required
      endIcons={
        <PasswordViewIcon onToggle={onToggleVisibility} isVisible={isVisible} />
      }
      {...rest}
    />
  );
};

interface ISetPasswordViewIcon {
  onToggle: () => void;
  isVisible: boolean;
}

export interface IPassword extends FormControlProps {
  register: UseFormRegister<any>;
  isVisible: boolean;
  error?: any;
  onToggleVisibility: () => void;
  name: string;
  placeholder?: string;
  control?: any;
}

export default Password;
