import { Input, Button } from "@chakra-ui/react";
import { useFormHook } from "@soaltee-loyalty/hooks/useFormhook";
import { colors } from "@soaltee-loyalty/theme/colors";
import styled from "styled-components";

interface ISignInProps {
  mutate: any;
  isLoading: boolean;
}

const Wrapper = styled.div`
  .title {
    font-size: 46px;
    font-weight: 700;
    color: ${colors.secondary_black};
  }
  .text {
    font-size: 18px;
    color: ${colors.secondary_black};
  }
`;
const LoginComponent: React.FC<ISignInProps> = ({ mutate }) => {
  const { handleSubmit, register, errors } = useFormHook();
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <Wrapper>
      <span className="title">Welcome Back</span>
      <p className="text">Enter your details to sign in</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          size={"md"}
          placeholder="Name"
          {...register("name")}
          className="input-field"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <Input
          size={"md"}
          placeholder="Email"
          {...register("email")}
          className="input-field"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Button type="submit" className="button">
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};
export default LoginComponent;
