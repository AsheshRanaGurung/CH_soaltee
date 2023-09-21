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
import { DatePickerIcon } from "@src/assets/svgs";

const DateInput = styled.div`
  z-index: 1;
  position: relative;
  .react-datepicker-wrapper {
    width: 100%;
  }
  .picker {
    padding: 8px;
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
  .react-datepicker-wrapper {
    color: ${colors.black};
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
  defaultValue?: any;
  minDate?: any;
}

const DateComponent = ({
  name,
  label,
  labelDisabled,
  helperText,
  error,
  endIcons,
  changeDate,
  defaultValue,
  minDate,
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
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  // {...rest}
                  value={value}
                  selected={value ? value : defaultValue}
                  className="picker"
                  onChange={(value) => {
                    onChange(value);
                    changeDate(value);
                  }}
                  placeholderText="YYYY-DD-MM"
                  dateFormat="yyyy-MM-dd"
                  minDate={minDate}
                  onChangeRaw={(e) => {
                    e.preventDefault();
                  }}
                  // excludeDates={checkInDate ? [checkInDate] : []}

                  // onChangeRaw={(e) => {
                  //   if (e.target.value) {
                  //     const rawDate = e.target.value;
                  //     const newDate = rawDate?.split("-");
                  //     changeDate(newDate[0] && new Date(newDate[0]));
                  //   }
                  // }}
                />
              );
            }}
          />

          {endIcons && (
            <InputRightElement top="0px" zIndex="99999">
              <DatePickerIcon />
            </InputRightElement>
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
