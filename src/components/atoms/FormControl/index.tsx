import DateComponent from "../DateInput";
import Input from "../Input";
import Password from "../Password";
import Select from "../Select";
import CustomSelect from "../Select/custom";

import Switch from "../Switch";

function FormControl(props: any) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "password":
      return <Password {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "CustomSelect":
      return <CustomSelect {...rest} />;
    case "switch":
      return <Switch {...rest} />;
    case "date":
      return <DateComponent {...rest} />;
    // case "checkbox":
    //   return <Checkbox {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
