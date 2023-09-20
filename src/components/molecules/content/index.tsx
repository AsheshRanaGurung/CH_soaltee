import { colors } from "@src/theme/colors";
import styled from "styled-components";
interface IProps {
  children: React.ReactNode;
}
const Wrapper = styled.div`
  background-color: ${colors.foundation};
  padding: 20px;
  margin: 15px 0px 0px 0px;
  min-height: 500px;
`;
const Container = styled.div`
  background-color: ${colors.white};
  padding: 20px;
`;
const Content: React.FC<IProps> = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};
export default Content;
