import { Button, useDisclosure } from "@chakra-ui/react";

import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";
import * as yup from "yup";
import Heading from "@soaltee-loyalty/components/atoms/Heading";
import FormControl from "@soaltee-loyalty/components/atoms/FormControl";
import { FormWrapper } from "../authentication/login";

interface ISignupProps {
  mutate: any;
  isLoading: boolean;
}
const SetPasswordTemplate: React.FC<ISignupProps> = ({ mutate }) => {
  const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    new_password: yup.string().required("Password is required"),
    confirm_password: yup.string().required("Password is required"),
  });
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
    mutate(data);
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
            name="password"
            placeholder={"Password"}
            label="Enter your Password"
            error={errors?.password?.message ?? ""}
            required
          />
          <FormControl
            control="password"
            register={register}
            size="lg"
            isVisible={isVisibleNewPassword}
            onToggleVisibility={onToggleVisibilityNewPassword}
            name="new_password"
            placeholder={" Enter your Password"}
            label="New Password"
            error={errors?.new_password?.message ?? ""}
            required
          />
          <FormControl
            control="password"
            register={register}
            size="lg"
            isVisible={isVisibleConfirmPassword}
            onToggleVisibility={onToggleVisibilityConfirmPassword}
            name="confirm_password"
            placeholder={"Confirm Your Password"}
            label="Confirm Password"
            error={errors?.change_password?.message ?? ""}
            required
          />
          <Button
            type="submit"
            className="button"
            w="100%"
            borderRadius="none"
            mt={12}
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
