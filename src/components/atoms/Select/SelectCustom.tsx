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
    valueKey,
    labelKey,
  } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl id={name} isInvalid={!!get(errors, name)}>
      <Select
        size={"sm"}
        iconColor={colors.primary}
        placeholder={
          isError
            ? "No Data Available"
            : placeholder.charAt(0).toUpperCase() + placeholder.slice(1)
        }
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
          selectOptions.map((option: any) => (
            <option key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
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
  valueKey: string;
  labelKey: string;
  onAdditionalOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
