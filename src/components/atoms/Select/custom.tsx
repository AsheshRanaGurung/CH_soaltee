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
  .select-component {
    padding: 5px !important;
    option {
      padding: 45px !important;
    }
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
  marginBottom,
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
          id={name}
          size={"sm"}
          fontSize="14px !important"
          textColor={selected ? "black" : "gray"}
          fontWeight={selected ? "500" : "400"}
          marginBottom={marginBottom ? marginBottom : "10px"}
          _focusVisible={{
            borderBottom: `1px solid ${colors.primary}`,
          }}
          border={`1px solid ${colors.primary}`}
          color={colors.primary}
          borderRadius="10px"
          padding="8px, 4px, 8px, 4px"
          onChange={handlehange}
          className="select-component"
          {...rest}
        >
          <option
            value={""}
            style={{ color: colors.primary_placeholder }}
            disabled={selected ? true : false}
          >
            {placeholder}
          </option>
          {options.map(({ label, value }) => (
            <option
              style={{
                color: "black",
                marginLeft: "35px",
                padding: "50px",
                height: "30px",
              }}
              key={value}
              value={value || ""}
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
