import { Button, useDisclosure, Link, Stack } from "@chakra-ui/react";
import Checkbox from "@src/components/atoms/Checkbox";
import FormControl from "@src/components/atoms/FormControl";
import Heading from "@src/components/atoms/Heading";
import { useFormHook } from "@src/hooks/useFormhook";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
import * as yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ISignInProps {
  mutate?: any;
  isLoading?: boolean;
}
export const FormWrapper = styled.div`
  margin-top: 5%;
  width: 450px;
  label {
    margin-bottom: 5px;
  }
`;
export const ChangePasswordWrapper = styled.div`
  width: 400px;
  margin-top: 5%;
`;
export const AccountDetailStyle = styled.div`
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  .signup {
    color: ${colors.primary};
    margin-left: 10px;
    cursor: pointer;
  }
`;
const ForgotPasswordStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 30px;
  font-weight: 600;
  span {
    // color: ${colors.primary};
  }
`;
const LoginComponent: React.FC<ISignInProps> = ({ mutate, isLoading }) => {
  const [_, setRememberEmail] = useState(localStorage.getItem("email") || "");

  const { isOpen: isVisible, onToggle: onToggleVisibility } = useDisclosure();
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup.string().required("Password is required"),
  });

  const { handleSubmit, register, control, errors, watch, setValue } =
    useFormHook({
      validationSchema,
    });
  const onSubmit = (data: any) => {
    mutate(data);
    localStorage.setItem("userInfo", data?.email);
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue("email", storedEmail);
      setValue("forgot_password", true);
      setRememberEmail(storedEmail);
    }
  }, []);
  const handleRememberChange = (e: any) => {
    if (e.target.checked) {
      localStorage.setItem("email", watch("email"));
    } else {
      localStorage.removeItem("email");
    }
  };
  return (
    <Stack className="login">
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
          <ForgotPasswordStyle>
            <Checkbox
              control={control}
              name="forgot_password"
              colorScheme="red"
              w="auto"
              onChange={handleRememberChange}
              label={<span>Remember Me</span>}
            />
            <Button
              bg={"transparent"}
              textAlign="right"
              color={colors.primary}
              padding={"0px 20px"}
              height={"auto"}
              onClick={() => navigate(NAVIGATION_ROUTES.FORGOT_PASSWORD)}
            >
              Forgot Password?
            </Button>
          </ForgotPasswordStyle>
          <Button
            type="submit"
            className="button"
            isLoading={isLoading}
            width={"100%"}
            borderRadius={"none"}
            disabled={isLoading}
          >
            Submit
          </Button>
          <AccountDetailStyle>
            <span>{`Don't have an account?`}</span>
            <Link as={RouterLink} to={NAVIGATION_ROUTES.SIGNUP}>
              <span className="signup">Signup</span>
            </Link>
          </AccountDetailStyle>
        </FormWrapper>
      </form>
    </Stack>
  );
};
export default LoginComponent;
