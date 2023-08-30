import { useMutation } from "react-query";
import { SignupTemplate } from "@soaltee-loyalty/components/templates/authentication/register";
import { signUpApi } from "@soaltee-loyalty/service/auth";
import Authentication from "@soaltee-loyalty/components/molecules/auth";
import {
  toastFail,
  toastSuccess,
} from "@soaltee-loyalty/service/service-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { NAVIGATION_ROUTES } from "@soaltee-loyalty/routes/routes.constant";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(signUpApi, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.data?.message || "Congratulations!");
      localStorage.setItem("userInfo", response?.data?.data?.email);
      localStorage.setItem("userRole", response?.data?.data?.role);
      navigate(NAVIGATION_ROUTES.SUCCESS);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
  return (
    <Authentication>
      <SignupTemplate mutate={mutate} isLoading={isLoading} />
    </Authentication>
  );
};
export default Signup;
