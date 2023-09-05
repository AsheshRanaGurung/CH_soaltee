import { useMutation } from "react-query";
import { resetPasswordApi } from "@src/service/auth";
import Authentication from "@src/components/molecules/auth";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import ForgotPassword from "@src/components/templates/authentication/forgot-password";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(resetPasswordApi, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Password changed successfully");
      navigate(NAVIGATION_ROUTES.SUCCESS);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  return (
    <Authentication>
      <ForgotPassword mutate={mutate} isLoading={isLoading} />
    </Authentication>
  );
};
export default ForgotPasswordPage;
