import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select as ChakraSelect,
  SelectProps,
} from "@chakra-ui/react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { colors } from "@src/theme/colors";
import styled from "styled-components";

const SelectWrapper = styled.div`
  select {
    // padding: 0;
  }
`;
const Select = ({
  placeholder,
  label,
  options,
  rules,
  register,
  helperText,
  name,
  error,
  isRequired,
  required,
  enabled,
  isSelected,
  ...rest
}: ISelect) => {
  const [selected, setSelected] = useState(false);
  const handlehange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(!!event.target.value);
  };

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && (
        <FormLabel htmlFor={name} fontWeight={600} fontSize={"14px"} m={0}>
          {label}
          {required && <span style={{ color: colors.red }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <SelectWrapper>
        <ChakraSelect
          {...register(name, rules)}
          {...rest}
          id={name}
          size={"sm"}
          fontSize="14px !important"
          textColor={selected ? "black" : "gray"}
          fontWeight={selected ? "500" : "400"}
          border="none"
          borderBottom=" 1px solid rgba(0, 0, 0, 0.15)"
          borderRadius="0"
          marginBottom="10px"
          borderColor={error ? colors.red : colors.primary_dark}
          borderWidth={error ? "2px" : "1px"}
          placeholder={placeholder}
          _focusVisible={{
            borderBottom: `1px solid ${colors.primary} `,
            borderRadius: "0",
          }}
          //
          onChange={handlehange}
        >
          {options.map(({ label, value }) => (
            <option
              key={value}
              value={value}
              disabled={isSelected?.includes(value)}
            >
              {label}
            </option>
          ))}
        </ChakraSelect>
      </SelectWrapper>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export interface ISelect extends SelectProps {
  placeholder?: string;
  options: ISelectOption[];
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  error?: any;
  rules?: RegisterOptions;
  helperText?: string;
  isRequired?: boolean;
  required?: boolean;
  enabled?: boolean;
  isSelected?: any;
}
export default Select;

export interface ISelectOption {
  label: string;
  value: string;
}
