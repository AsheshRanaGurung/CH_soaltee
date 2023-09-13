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
  .css-1nu4b02 > option,
  .css-1nu4b02 > optgroup {
    color: white;
  }
  .chakra-select__wrapper {
    color: ${colors.primary_placeholder};
  }
  .select-component {
    padding: 5px !important;
    option {
      padding: 45px !important;
    }
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
          {...rest}
          id={name}
          size={"sm"}
          fontSize="14px !important"
          fontWeight={selected ? "500" : "400"}
          border="none"
          borderBottom=" 1px solid rgba(0, 0, 0, 0.15)"
          borderRadius="0"
          marginBottom={marginBottom ? marginBottom : "10px"}
          borderColor={error ? colors.red : colors.light_gray_1}
          borderWidth={error ? "2px" : "1px"}
          _focusVisible={{
            borderRadius: "0",
          }}
          textColor={selected ? "black" : colors.primary_placeholder}
          onChange={handlehange}
          color={colors.primary_placeholder}
          className="select-component"
        >
          <option
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
              value={value}
              disabled={isSelected?.includes(value)}
            >
              {label}
            </option>
          ))}
        </ChakraSelect>
      </SelectWrapper>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage fontSize={"12px"}>{error}</FormErrorMessage>}
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
