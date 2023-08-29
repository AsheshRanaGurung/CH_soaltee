import { RxHamburgerMenu } from "react-icons/rx";
import styled from "styled-components";
import { colors } from "@soaltee-loyalty/theme/colors";
import { getSidebarState } from "@soaltee-loyalty/components/organisms/layout";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  span {
    line-height: 17px;
    color: ${colors.text_black};
  }
`;
interface IBreadCrumb {
  name: string;
}

export const BreadCrumb = ({ name }: IBreadCrumb) => {
  const { showSidebar, setShowSidebar } = getSidebarState();

  return (
    <Wrapper>
      <RxHamburgerMenu onClick={() => setShowSidebar(!showSidebar)} />
      <span color={colors.primary_dark}>{name}</span>
    </Wrapper>
  );
};
