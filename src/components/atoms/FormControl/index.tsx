import Input from "../Input";
import Password from "../Password";
import Select from "../Select";

function FormControl(props: any) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "password":
      return <Password {...rest} />;
    case "select":
      return <Select {...rest} />;
    // case "checkbox":
    //   return <Checkbox {...rest} />;
    default:
      return null;
  }
}

export default FormControl;
