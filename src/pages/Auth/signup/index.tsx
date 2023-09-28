import { useMutation } from "react-query";
import { SignupTemplate } from "@src/components/templates/authentication/register";
import { signUpApi } from "@src/service/auth";
import Authentication from "@src/components/molecules/auth";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(signUpApi, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message || "Congratulations!");
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
