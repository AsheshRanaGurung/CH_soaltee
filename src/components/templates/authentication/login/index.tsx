import { Button, useDisclosure, Text } from "@chakra-ui/react";
import Checkbox from "@soaltee-loyalty/components/atoms/Checkbox";
import FormControl from "@soaltee-loyalty/components/atoms/FormControl";
import Heading from "@soaltee-loyalty/components/atoms/Heading";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";
import { colors } from "@soaltee-loyalty/theme/colors";
import styled from "styled-components";
import * as yup from "yup";

interface ISignInProps {
  mutate: any;
  isLoading: boolean;
}
export const FormWrapper = styled.div`
  margin-top: 5%;
  width: 400px;
`;
const AccountDetail = styled.div`
  font-weight: 600;
  text-align: center;
  .signup {
    color: ${colors.primary};
    margin-left: 10px;
    cursor: pointer;
  }
`;
const ForgotPassword = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 50px;
  font-weight: 600;
  span {
    // color: ${colors.primary};
  }
`;
const LoginComponent: React.FC<ISignInProps> = ({ mutate }) => {
  const { isOpen: isVisible, onToggle: onToggleVisibility } = useDisclosure();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup.string().required("Password is required"),
  });

  const { handleSubmit, register, control, errors } = useFormHook({
    validationSchema,
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <>
      <Heading title="Welcome Back" text="Enter your details to sign in" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <FormControl
            control="input"
            name="email"
            mb={20}
            required
            placeholder="Enter your mail"
            label="Email"
            register={register}
            error={errors.email?.message || ""}
          />
          <FormControl
            control="password"
            register={register}
            size="lg"
            isVisible={isVisible}
            onToggleVisibility={onToggleVisibility}
            name="password"
            placeholder={"Password"}
            label="Enter your Password"
            error={errors?.password?.message ?? ""}
            required
          />
          <ForgotPassword>
            <Checkbox
              control={control}
              name="forgot_password"
              colorScheme="red"
              w="auto"
              label={<span>Remember Me</span>}
            />
            <Text w="100%" textAlign="right" color={colors.primary}>
              Forgot Password?
            </Text>
          </ForgotPassword>
          <Button
            type="submit"
            className="button"
            width={"100%"}
            borderRadius={"none"}
          >
            Submit
          </Button>
          <AccountDetail>
            <span>{`Don't have an account?`}</span>
            <span className="signup">Signup</span>
          </AccountDetail>
        </FormWrapper>
      </form>
    </>
  );
};
export default LoginComponent;
