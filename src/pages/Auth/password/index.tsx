import { useMutation } from "react-query";
import { signUpApi } from "@soaltee-loyalty/service/auth/signup";
import Authentication from "@soaltee-loyalty/components/molecules/auth";
import { SetPasswordTemplate } from "@soaltee-loyalty/components/templates/set-password";

const SetPassword = () => {
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
      <SetPasswordTemplate mutate={mutate} isLoading={isLoading} />
    </Authentication>
  );
};
export default SetPassword;
