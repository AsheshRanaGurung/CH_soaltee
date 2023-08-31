import styled from "styled-components";
import { colors } from "@soaltee-loyalty/theme/colors";
interface IPropIcons {
  icon?: React.ReactNode;
  bg_color?: string;
  icon_color?: string;
  height?: string;
  width?: string;
  border_radius?: string;
}

const Wrapper = styled.div<IPropIcons>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg_color || colors.secondary};
  color: ${(props) => props.icon_color || colors.primary};
  height: ${(props) => props.height || "32px"};
  width: ${(props) => props.width || "32px"};
  border-radius: ${(props) => props.border_radius || "50%"};
`;
const Icons: React.FC<IPropIcons> = ({ icon, ...rest }) => {
  return <Wrapper {...rest}>{icon}</Wrapper>;
};
export default Icons;
