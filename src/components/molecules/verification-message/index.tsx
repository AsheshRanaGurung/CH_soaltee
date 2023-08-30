import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { imageList } from "@soaltee-loyalty/assets/images";
import { NAVIGATION_ROUTES } from "@soaltee-loyalty/routes/routes.constant";
import { colors } from "@soaltee-loyalty/theme/colors";
import styled from "styled-components";
import { useNavigate } from "react-router";
const Wrapper = styled.div`
  width: 490px;
  .image {
    display: block;
    margin: auto;
  }
`;
const VerificationMessage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Text fontSize={"4xl"} textAlign={"center"}>
        Verification has been sent to your email
      </Text>
      <img className="image" src={imageList.EmailIcon} />
      <Text fontSize={"lg"} textAlign={"center"}>
        You just need to verify your email address. To do this, check the email
        address you provided for a message and click the
      </Text>
      <Text fontSize={"lg"} textAlign={"center"} color={colors.primary}>
        {" "}
        verify your email address link provided.
      </Text>
      <Button
        display={"block"}
        margin={"40px auto"}
        onClick={() => navigate(NAVIGATION_ROUTES.SETPASSWORD)}
      >
        Proceed
      </Button>
    </Wrapper>
  );
};
export default VerificationMessage;
