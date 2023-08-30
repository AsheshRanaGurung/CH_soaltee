import LoginComponent from "@soaltee-loyalty/components/templates/authentication/login";
import { useMutation } from "react-query";
import { loginApi } from "@soaltee-loyalty/service/auth";
import Authentication from "@soaltee-loyalty/components/molecules/auth";
import { toastSuccess } from "@soaltee-loyalty/service/service-toast";
import TokenService from "@soaltee-loyalty/service/config/service-token";
import { NAVIGATION_ROUTES } from "@soaltee-loyalty/routes/routes.constant";
import { useNavigate } from "react-router";

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
        navigate(NAVIGATION_ROUTES.DASHBOARD);
      }
    },

    onError: () => {
      console.error("This is error");
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
