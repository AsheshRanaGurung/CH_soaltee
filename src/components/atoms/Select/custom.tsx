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
const CustomSelect = ({
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
          marginBottom="10px"
          placeholder={placeholder}
          _focusVisible={{
            borderBottom: `1px solid #AB1D3F `,
          }}
          border="1px solid #AB1D3F"
          color="#AB1D3F"
          borderRadius="10px"
          padding="8px, 4px, 8px, 4px"
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
export default CustomSelect;

export interface ISelectOption {
  label: string;
  value: string;
}
