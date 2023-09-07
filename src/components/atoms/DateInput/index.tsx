import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { colors } from "@src/theme/colors";
import { Controller, useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

const DateInput = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }
  .picker {
    position: relative; /* Ensure the position is set to relative or absolute for z-index to work */
    z-index: 1000;
  }
  input {
    width: 100%;
    &:focus {
      outline: none;
      border: none;
    }
  }
  .react-datepicker__day--selected {
    background: ${colors.primary};
  }
`;

interface IDate {
  label?: string;
  helperText?: string;
  error?: any;
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  endIcons?: React.ReactNode;
  labelDisabled?: string;
  changeDate: (date: any) => any;
}

const DateComponent = ({
  name,
  label,
  labelDisabled,
  helperText,
  error,
  endIcons,
  changeDate,
  ...rest
}: IDate) => {
  const { control } = useForm();

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel htmlFor={name} fontWeight={600} fontSize={"14px"} m={0}>
          {label}
          {rest.isRequired && <span style={{ color: "red" }}>&nbsp;*</span>}
        </FormLabel>
      )}

      {labelDisabled && (
        <FormLabel htmlFor={name} fontWeight={600} fontSize={"14px"} m={0}>
          {labelDisabled}
        </FormLabel>
      )}

      <DateInput>
        <InputGroup
          sx={{
            border: "none",
            borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
            borderRadius: "0",
            paddingX: 0,
            width: "100%",
            marginBottom: "10px",
          }}
        >
          {/* we need to change the value and then bind the changed value  */}
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                {...rest}
                selected={value}
                className="picker"
                onChange={(value) => {
                  onChange(value);
                  changeDate(value);
                }}
                dateFormat="yyyy-MM-dd"
              />
            )}
          />
          {endIcons && (
            <InputRightElement top="-10px">{endIcons}</InputRightElement>
          )}
        </InputGroup>
      </DateInput>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && (
        <FormErrorMessage mt={0} mb={2}>
          {error.message ?? ""}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default DateComponent;
