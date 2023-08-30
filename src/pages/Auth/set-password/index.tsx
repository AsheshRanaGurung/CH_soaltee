import { useMutation } from "react-query";
import { setPasswordApi } from "@soaltee-loyalty/service/auth";
import Authentication from "@soaltee-loyalty/components/molecules/auth";
import { SetPasswordTemplate } from "@soaltee-loyalty/components/templates/set-password";
import {
  toastFail,
  toastSuccess,
} from "@soaltee-loyalty/service/service-toast";
import { NAVIGATION_ROUTES } from "@soaltee-loyalty/routes/routes.constant";
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
