import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface IProps {
  validationSchema?: any;
  defaultValues?: any;
}
export const useFormHook = ({ validationSchema, defaultValues }: IProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  return {
    register,
    handleSubmit,
    control,
    errors,
    reset,
    watch,
    setValue,
  };
};
