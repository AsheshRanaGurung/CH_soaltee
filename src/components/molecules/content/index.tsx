import { colors } from "@src/theme/colors";
import styled from "styled-components";
interface IProps {
  children: React.ReactNode;
  bg_color?: string;
}
const Wrapper = styled.div`
  background-color: ${colors.foundation};
  padding: 20px;
  margin: 15px 0px 0px 0px;
  min-height: 500px;
`;
const Container = styled.div<any>`
  background-color: ${(props) =>
    props.bg_color ? props.bg_color : `${colors.white}`};
  padding: 20px;
`;
const Content: React.FC<IProps> = ({ children, bg_color }) => {
  return (
    <Wrapper>
      <Container bg_color={bg_color}>{children}</Container>
    </Wrapper>
  );
};
export default Content;
