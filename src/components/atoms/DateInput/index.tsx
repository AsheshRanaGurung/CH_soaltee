import React, { useRef } from "react";
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
import { Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { DatePickerIcon } from "@src/assets/svgs";
import { formatDateToYYYYMMDD } from "@src/utility/formatDateToYYYYMMDD";

const DateInput = styled.div<any>`
  z-index: 2;
  position: relative;
  .react-datepicker-wrapper {
    width: 100%;
  }
  .picker {
    padding-top: 8px;
    padding-bottom: 8px;
    background: ${(props) => (props.bg_color ? props.bg_color : "transparent")};
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
  minDate?: any;
  bg_color?: string;
  required?: boolean;
  maxDate?: any;
  labelColor?: string;
  control?: any;
  isClearable?: boolean;
  defaultValue?: any;
  onChange?: any;
}

const DateComponent = ({
  name,
  label,
  labelDisabled,
  helperText,
  error,
  endIcons,
  minDate,
  bg_color,
  maxDate,
  labelColor,
  control,
  defaultValue,
  onChange,
  ...rest
}: IDate) => {
  const hasError = !!error;
  const datepickerRef = useRef(null);

  function handleClickDatepickerIcon() {
    const datepickerElement = datepickerRef.current as any;
    if (datepickerElement) {
      datepickerElement.setOpen(true);
    }
  }
  return (
    <FormControl isInvalid={!!error} id={name}>
      {label && (
        <FormLabel
          htmlFor={name}
          fontWeight={600}
          fontSize={"14px"}
          m={0}
          style={labelColor ? { color: labelColor } : {}}
        >
          {label}
          {rest.required && <span style={{ color: colors.red }}>&nbsp;*</span>}
        </FormLabel>
      )}

      {labelDisabled && (
        <FormLabel htmlFor={name} fontWeight={600} fontSize={"14px"} m={0}>
          {labelDisabled}
        </FormLabel>
      )}

      <DateInput bg_color={bg_color}>
        <InputGroup
          sx={{
            border: "none",
            borderBottom: hasError
              ? `1px solid ${colors.red}`
              : "1px solid rgba(0, 0, 0, 0.15)",
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
            defaultValue={defaultValue} // Set the default value
            render={({ field }) => {
              const handleChange = (date: any) => {
                const formattedDate = formatDateToYYYYMMDD(date);
                field.onChange(formattedDate);
                onChange && onChange(formattedDate);
              };
              return (
                <DatePicker
                  {...rest}
                  onChange={handleChange}
                  selected={
                    defaultValue
                      ? new Date(defaultValue)
                      : field.value
                      ? new Date(field.value)
                      : null
                  }
                  className="picker"
                  placeholderText="YYYY-DD-MM"
                  dateFormat="yyyy-MM-dd"
                  minDate={minDate}
                  maxDate={maxDate}
                  ref={datepickerRef}
                />
              );
            }}
          />

          {endIcons && (
            <InputRightElement top="0px" zIndex="99999">
              <DatePickerIcon onClick={() => handleClickDatepickerIcon()} />
            </InputRightElement>
          )}
        </InputGroup>
      </DateInput>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && (
        <FormErrorMessage mt={0} mb={2} fontSize={12}>
          {error ?? ""}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default DateComponent;
