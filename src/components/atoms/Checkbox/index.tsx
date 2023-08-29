import {
  FormErrorMessage,
  FormLabel,
  CheckboxProps,
  Checkbox as ChakraCheckbox,
  FormControl,
} from "@chakra-ui/react";
import { colors } from "@soaltee-loyalty/theme/colors";

import {
  RegisterOptions,
  FieldValues,
  Controller,
  Control,
} from "react-hook-form";

const Checkbox = <T extends FieldValues>({
  label,
  name,
  rules,
  isRequired,
  control,
  ...rest
}: ICheckbox<T>) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          isInvalid={!!error}
          isRequired={isRequired}
          display="flex"
          gap={2.5}
        >
          <ChakraCheckbox
            borderColor={colors.primary}
            {...field}
            isChecked={field.value}
            {...rest}
          />
          {label && (
            <FormLabel fontWeight={400} fontSize={"14px"} m={1}>
              {label}
            </FormLabel>
          )}
          {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  );
};

interface ICheckbox<TFieldValues extends FieldValues = FieldValues>
  extends CheckboxProps {
  label?: React.ReactNode;
  name: any;
  rules?: RegisterOptions;
  isRequired?: boolean;
  control: Control<TFieldValues, unknown>;
}

export default Checkbox;
