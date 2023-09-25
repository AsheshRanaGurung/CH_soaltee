import {
  FormErrorMessage,
  FormLabel,
  Select,
  FormControl,
} from "@chakra-ui/react";
import {
  FieldError,
  useController,
  Control,
  FieldErrorsImpl,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { get } from "lodash";
import { SelectProps } from "@chakra-ui/react";
import { colors } from "@src/theme/colors";

export const SelectCustom = <T extends FieldValues = FieldValues>(
  props: ISelectInput<T>
) => {
  const {
    errors,
    name,
    control,
    label,
    placeholder,
    selectOptions,
    isFieldRequired,
    onAdditionalOnChange,
    isError,
  } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  const placeholderText =
    selectOptions.length === 1
      ? ""
      : isError
      ? "No Data Available"
      : placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
  return (
    <FormControl id={name} isInvalid={!!get(errors, name)}>
      <Select
        size={"sm"}
        iconColor={colors.primary}
        placeholder={placeholderText}
        transform={"capitalize"}
        onChange={(e) => {
          field.onChange(e);
          if (onAdditionalOnChange !== undefined) {
            onAdditionalOnChange(e);
          }
        }}
        borderRadius={"16px"}
        cursor={"pointer"}
        _hover={{
          borderColor: colors.primary,
        }}
        _focus={{
          borderColor: colors.primary,
        }}
        _active={{
          borderColor: colors.primary,
        }}
        borderColor={colors.primary}
      >
        {selectOptions &&
          selectOptions.length !== 0 &&
          selectOptions.map((item: any) => (
            <option key={item?.value} value={item?.value}>
              {item?.label}
            </option>
          ))}
      </Select>

      {label && (
        <FormLabel>
          {label}
          {isFieldRequired && <sup>*</sup>}
        </FormLabel>
      )}
      <FormErrorMessage>
        {error && (get(errors, name) as FieldError)?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export interface ISelectInput<T extends FieldValues = FieldValues>
  extends SelectProps {
  control: Control<T, unknown>;
  errors: Partial<FieldErrorsImpl<T>>;
  name: FieldPath<T>;
  label?: string;
  placeholder: string;
  isLoading?: boolean;
  isError?: boolean;
  selectOptions?: any;
  isFieldRequired?: boolean;
  onAdditionalOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
