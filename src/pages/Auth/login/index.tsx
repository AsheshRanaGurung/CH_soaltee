import LoginComponent from "@src/components/templates/authentication/login";
import { useMutation } from "react-query";
import { loginApi } from "@src/service/auth";
import Authentication from "@src/components/molecules/auth";
import { toastSuccess, toastFail } from "@src/service/service-toast";
import TokenService from "@src/service/config/service-token";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "@src/interface/decodedToken";
import { AxiosError } from "axios";
const Login = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(loginApi, {
    onSuccess: (response) => {
      toastSuccess("User logged in");
      const tokens = {
        access: response.data.data.token,
      };
      TokenService.setToken(tokens);
      if (response.data.responseCode === "200") {
        const token = jwt_decode<DecodedToken>(response.data.data.token);
        !token?.role.includes("USER")
          ? navigate(NAVIGATION_ROUTES.DASHBOARD)
          : navigate(NAVIGATION_ROUTES.USER_DASHBOARD);
      }
    },

    onError: (err: AxiosError<{ message: string }>) => {
      if (err && err?.response?.data?.message === "Email Not Verified") {
        toastFail("You need to change password first");
        return navigate(NAVIGATION_ROUTES.SETPASSWORD);
      } else {
        toastFail(err?.response?.data?.message ?? "Something went wrong");
      }
    },
  });
  return (
    <>
      <Authentication>
        <LoginComponent mutate={mutate} isLoading={isLoading} />
      </Authentication>
    </>
  );
};
export default Login;
