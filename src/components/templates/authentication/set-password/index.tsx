import { Button, useDisclosure } from "@chakra-ui/react";

import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import Heading from "@src/components/atoms/Heading";
import FormControl from "@src/components/atoms/FormControl";
import { FormWrapper } from "../login";
import { createPasswordSchema } from "@src/utility/passwordValidation";

interface ISignupProps {
  mutate: any;
  isLoading: boolean;
}
const validationSchema = yup.object().shape({
  oldPassword: yup.string().required("Password is required"),
  newPassword: createPasswordSchema(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Password doesn't match")
    .required("Password is required")
    .typeError("Password is required"),
});
const SetPasswordTemplate: React.FC<ISignupProps> = ({ mutate, isLoading }) => {
  const { isOpen: isVisiblePassword, onToggle: onToggleVisibilityPassword } =
    useDisclosure();

  const {
    isOpen: isVisibleNewPassword,
    onToggle: onToggleVisibilityNewPassword,
  } = useDisclosure();

  const {
    isOpen: isVisibleConfirmPassword,
    onToggle: onToggleVisibilityConfirmPassword,
  } = useDisclosure();

  const { handleSubmit, register, errors } = useFormHook({
    validationSchema,
  });

  const onSubmit = (data: any) => {
    const email = localStorage.getItem("userInfo");
    mutate({ ...data, email: email });
  };

  return (
    <>
      <Heading title="Set Password" text="Choose your password" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FormControl
            control="password"
            register={register}
            size="lg"
            isVisible={isVisiblePassword}
            onToggleVisibility={onToggleVisibilityPassword}
            name="oldPassword"
            placeholder={"Password"}
            label="Enter your Password"
            error={errors?.oldPassword?.message ?? ""}
            required
          />
          <FormControl
            control="password"
            register={register}
            size="lg"
            isVisible={isVisibleNewPassword}
            onToggleVisibility={onToggleVisibilityNewPassword}
            name="newPassword"
            placeholder={" Enter your Password"}
            label="New Password"
            error={errors?.newPassword?.message ?? ""}
            required
          />
          <FormControl
            control="password"
            register={register}
            size="lg"
            isVisible={isVisibleConfirmPassword}
            onToggleVisibility={onToggleVisibilityConfirmPassword}
            name="confirmPassword"
            placeholder={"Confirm Your Password"}
            label="Confirm Password"
            error={errors?.confirmPassword?.message ?? ""}
            required
          />
          <Button
            type="submit"
            className="button"
            w="100%"
            borderRadius="none"
            mt={12}
            isLoading={isLoading}
            // disabled={isSubmitting}
          >
            Change Password
          </Button>
        </FormWrapper>
      </form>
    </>
  );
};
export { SetPasswordTemplate };
