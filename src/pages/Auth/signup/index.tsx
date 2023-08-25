import { SignupTemplate } from "../../../components/templates/authentication/register";
import styled from "styled-components";
import { useMutation } from "react-query";
import { signUpApi } from "../../../service/auth/signup";

const Wrapper = styled.div`
  display: block;
  margin: auto;
  width: 40%;
  .input-field {
    margin-bottom: 20px;
  }
  .button {
    display: block;
    margin: auto;
    width: 100%;
  }
  .title {
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    margin-bottom: 15px;
  }
`;
const Signup = () => {
  const { mutate, isLoading } = useMutation(signUpApi, {
    onSuccess: () => {
      console.log("This is success");
    },
    onError: () => {
      console.log("This is error");
    },
  });
  console.log("hit");
  return (
    <Wrapper>
      <SignupTemplate mutate={mutate} isLoading={isLoading} />
    </Wrapper>
  );
};
export default Signup;
