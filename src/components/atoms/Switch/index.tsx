import { Flex, FormLabel, Switch as ChakraSwitch } from "@chakra-ui/react";
import { colors } from "@soaltee-loyalty/theme/colors";
import { UseFormRegister } from "react-hook-form";

interface ISwitch {
  value?: boolean;
  variant?: string;
  name?: any;
  toggleSwitch?: () => void;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  register?: UseFormRegister<any>;
}

const Switch: React.FC<ISwitch> = ({
  variant,
  value,
  name,
  toggleSwitch,
  register,
  disabled,
  label,
  required,
}) => {
  return (
    <Flex>
      {label && (
        <FormLabel fontWeight={600} fontSize={"16px"} color={colors.primary}>
          {label}
          {required && <span style={{ color: colors.black }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <ChakraSwitch
        disabled={disabled}
        size="md"
        id={name}
        colorScheme={variant}
        isChecked={value}
        {...(register && register(name))}
        onChange={toggleSwitch}
      />
    </Flex>
  );
};

Switch.defaultProps = {
  variant: "primary",
};

export default Switch;
