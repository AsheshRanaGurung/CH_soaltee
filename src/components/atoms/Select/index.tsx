import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { colors } from "@src/theme/colors";
import Select from "react-select";
import styled from "styled-components";

const SelectWrapper = styled(Select)<any>`
  .css-13cymwt-control {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0px;
    border-color: none;
    box-shadow: none;
    background: ${(props) => (props.bg_color ? props.bg_color : "transparent")};
  }
  .css-1jqq78o-placeholder {
    color: ${colors.secondary_placeholder};
    font-size: 14px;
  }
  .css-t3ipsp-control {
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
    z-index: 2 !important;
    color: ${colors.primary_dark};
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
  register,
  selectedOption,
  onChange,
  options,
  rules,
  valueKey,
  labelKey,
  name,
  error,
  isRequired,
  label,
  required,
  helperText,
  value,
  isSelected,
  ...rest
}: any) => {
  const formattedOptions = options.map((option: any) => ({
    label: option[labelKey],
    value: option[valueKey],
  }));
  const formattedValue = value
    ? { label: value[labelKey], value: value[valueKey] }
    : {};
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired} mb={3}>
      {label && (
        <FormLabel htmlFor={name} fontWeight={500} fontSize={"14px"} m={0}>
          {label}
          {required && <span style={{ color: colors.red }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <SelectWrapper
        {...register(name, rules)}
        {...rest}
        id={name}
        options={formattedOptions.map((option: any) => ({
          ...option,
          isDisabled: isSelected?.includes(option.value),
        }))}
        onChange={onChange}
        defaultValue={value && formattedValue}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage fontSize={"12px"}>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ReactSelect;
