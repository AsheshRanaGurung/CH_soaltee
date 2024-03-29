import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { colors } from "@src/theme/colors";
import Select from "react-select";
import styled from "styled-components";
import { Text } from "@chakra-ui/react";
import { get } from "lodash";
import { Controller } from "react-hook-form";
export const SelectWrapper = styled(Select)<{
  error: boolean;
  bg_color: string;
  labelColor: string;
}>`
  .css-w9q2zk-Input2 {
    padding: 0;
  }
  .css-13cymwt-control {
    max-height: 31px;
    min-height: 31px;
    margin-bottom: 20px;
    border: none;
    border-bottom: ${(props) =>
      props.error
        ? `1px solid ${colors.red}`
        : "1px solid rgba(0, 0, 0, 0.15)"};
    border-radius: 0px;
    // border-color: none;
    box-shadow: none;
    background: ${(props) => (props.bg_color ? props.bg_color : "transparent")};
  }
  .css-1jqq78o-placeholder {
    color: ${colors.secondary_placeholder};
    font-size: 14px;
  }
  .css-t3ipsp-control {
    max-height: 31px;
    min-height: 31px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0px;
    border-color: none;
    box-shadow: none;
    background: ${(props) => (props.bg_color ? props.bg_color : "transparent")};
    &:hover {
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }
  }
  .css-1nmdiq5-menu {
    z-index: 3 !important;
    color: ${colors.black};
  }
  .css-art2ul-ValueContainer2 {
    padding: 0px;
  }
  .css-1u9des2-indicatorSeparator {
    display: none;
  }
  .css-1dimb5e-singleValue {
    color: ${colors.black};
  }
  .css-1p3m7a8-multiValue {
    background-color: rgba(171, 29, 63, 0.05);
    margin-bottom: 6px !important;
    margin-right: 8px !important;
  }
  .css-1y7rh0y-MultiValueGeneric2 {
    color: ${colors.primary};
  }
  .css-12a83d4-MultiValueRemove {
    svg {
      fill: ${colors.primary};
    }
  }
`;

export const colourStyles = {
  option: (styles: any) => {
    return {
      ...styles,
      color: "red !important",
    };
  },
};
const ReactSelect = ({
  options,
  valueKey,
  labelKey,
  name,
  error,
  isRequired,
  label,
  required,
  isSelected,
  control,
  labelColor,
  isClearable = true,
  onChange,
  isMulti = false,
  ...rest
}: any) => {
  const formattedOptions =
    options &&
    options.map((option: any) => ({
      label: option[labelKey],
      value: option[valueKey],
    }));

  return (
    <FormControl
      id={name}
      isInvalid={!!get(error, name)}
      isRequired={isRequired}
    >
      {label && (
        <FormLabel
          htmlFor={name}
          fontWeight={500}
          fontSize={"14px"}
          style={labelColor ? { color: labelColor } : {}}
          mb={0}
        >
          {" "}
          {label}
          {required && <span style={{ color: colors.red }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const hasError = !!error;
          return (
            <>
              <>
                <SelectWrapper
                  {...field}
                  {...rest}
                  isClearable={isClearable}
                  isMulti={isMulti}
                  options={formattedOptions.map((option: any) => ({
                    ...option,
                    isDisabled: isSelected?.includes(option.value),
                  }))}
                  error={hasError}
                />
              </>

              {error && (
                <Text color={colors.red} fontSize={"12px"} mt={2}>
                  {error}
                </Text>
              )}
            </>
          );
        }}
      />
    </FormControl>
  );
};

export default ReactSelect;
