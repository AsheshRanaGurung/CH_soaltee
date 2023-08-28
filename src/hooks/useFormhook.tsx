import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "@soaltee-loyalty/schema/index";
export const useFormHook = () => {
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
