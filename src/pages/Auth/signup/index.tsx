import { useMutation } from "react-query";
import { SignupTemplate } from "@soaltee-loyalty/components/templates/authentication/register";
import { signUpApi } from "@soaltee-loyalty/service/auth/signup";
import Authentication from "@soaltee-loyalty/components/molecules/auth";

const Signup = () => {
  const { mutate, isLoading } = useMutation(signUpApi, {
    onSuccess: () => {
      console.log("This is success");
    },
    onError: () => {
      console.error("This is error");
    },
  });
  return (
    <Authentication>
      <SignupTemplate mutate={mutate} isLoading={isLoading} />
    </Authentication>
  );
};
export default Signup;
