import { Button } from "@chakra-ui/react";
import Heading from "@soaltee-loyalty/components/atoms/Heading";
import TextInput from "@soaltee-loyalty/components/atoms/Input";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";
import { colors } from "@soaltee-loyalty/theme/colors";
import styled from "styled-components";
import * as yup from "yup";

interface ISignInProps {
  mutate: any;
  isLoading: boolean;
}
const FormWrapper = styled.div`
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  font-weight: 600;
  span {
    color: ${colors.primary};
  }
`;
const LoginComponent: React.FC<ISignInProps> = ({ mutate }) => {
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
          <TextInput
            className="fields"
            type="text"
            name="email"
            mb={20}
            required
            placeholder="Enter your mail"
            control={control}
            label="Email"
            register={register}
            error={errors.name?.message || ""}
          />
          <TextInput
            type="password"
            className="fields"
            name="password"
            required
            placeholder="Enter your password"
            control={control}
            label="Password"
            register={register}
            error={errors.password?.message || ""}
          />
          <ForgotPassword>
            <input type="checkbox" />
            <span>Forgot Password ?</span>
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
