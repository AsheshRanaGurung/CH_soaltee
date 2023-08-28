import LoginComponent from "@soaltee-loyalty/components/templates/authentication/login";
import { useMutation } from "react-query";
import { signUpApi } from "@soaltee-loyalty/service/auth/signup";
import Authentication from "@soaltee-loyalty/components/molecules/auth";

const Login = () => {
  const { mutate, isLoading } = useMutation(signUpApi, {
    onSuccess: () => {
      console.log("This is success");
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
