import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface IProps {
  validationSchema: any;
}
export const useFormHook = ({ validationSchema }: IProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return {
    register,
    handleSubmit,
    control,
    errors,
  };
};
