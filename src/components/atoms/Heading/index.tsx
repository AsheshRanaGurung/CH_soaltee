import { colors } from "@src/theme/colors";
import styled from "styled-components";
interface IHeadingProps {
  title?: string;
  text?: string;
}
const Wrapper = styled.div`
  .title {
    font-size: 46px;
    font-weight: 700;
    color: ${colors.secondary_black};
  }
  .text {
    font-size: 18px;
    color: ${colors.secondary_black_1};
  }
`;
const Heading: React.FC<IHeadingProps> = ({ text, title }) => {
  return (
    <Wrapper>
      <span className="title">{title}</span>
      <p className="text">{text}</p>
    </Wrapper>
  );
};
export default Heading;
