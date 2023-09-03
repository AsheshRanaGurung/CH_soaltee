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

const Content: React.FC<IProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
export default Content;
