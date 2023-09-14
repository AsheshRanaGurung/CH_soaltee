import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { colors } from "@src/theme/colors";
import Select from "react-select";
import styled from "styled-components";

const SelectWrapper = styled(Select)`
  .css-13cymwt-control {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0px;
    border-color: none;
    box-shadow: none;
    background: transparent;
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
    background: transparent;
    &:hover {
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }
  }

  .css-art2ul-ValueContainer2 {
    padding: 0px;
  }
  .css-1u9des2-indicatorSeparator {
    display: none;
  }
`;
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
        name={name}
        options={formattedOptions.map((option: any) => ({
          ...option,
          isDisabled: isSelected?.includes(option.value),
        }))}
        onChange={onChange}
        value={value}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormErrorMessage fontSize={"12px"}>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default ReactSelect;
