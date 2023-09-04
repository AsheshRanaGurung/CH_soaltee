import { useMutation } from "react-query";
import { setPasswordApi } from "@src/service/auth";
import Authentication from "@src/components/molecules/auth";
import { SetPasswordTemplate } from "@src/components/templates/authentication/set-password";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const SetPassword = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(setPasswordApi, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Password changed successfully");
      navigate(NAVIGATION_ROUTES.LOGIN);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  return (
    <Authentication>
      <SetPasswordTemplate mutate={mutate} isLoading={isLoading} />
    </Authentication>
  );
};
export default SetPassword;
