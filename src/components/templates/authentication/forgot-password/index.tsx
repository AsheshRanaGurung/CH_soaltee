import { Button } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import Heading from "@src/components/atoms/Heading";
import { useFormHook } from "@src/hooks/useFormhook";
import * as yup from "yup";
import styled from "styled-components";

interface IPasswordProps {
  mutate?: any;
  isLoading?: boolean;
}
const Wrapper = styled.div`
  form {
    margin-top: 50px;
  }
`;
const ForgotPassword: React.FC<IPasswordProps> = ({ mutate, isLoading }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
  });

  const { handleSubmit, register, errors } = useFormHook({
    validationSchema,
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <Wrapper>
      <Heading title="Forgot Password" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          control="input"
          width="400px"
          name="email"
          mb={20}
          required
          placeholder="Enter your mail"
          label="Email"
          register={register}
          error={errors.email?.message || ""}
        />
        <Button
          type="submit"
          className="button"
          isLoading={isLoading}
          width={"400px"}
          borderRadius={"none"}
          mt={5}
          disabled={isLoading}
        >
          Send
        </Button>
      </form>
    </Wrapper>
  );
};
export default ForgotPassword;
