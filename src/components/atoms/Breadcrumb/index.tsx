import styled from "styled-components";
import { colors } from "@src/theme/colors";
import Profile from "@src/components/molecules/profile";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 25px;
  justify-content: space-between;
  margin-top: 10px;
  span {
    line-height: 17px;
    color: ${colors.text_black};
  }
`;
interface IBreadCrumb {
  name?: string;
}

export const BreadCrumb = ({ name }: IBreadCrumb) => {
  return (
    <Wrapper>
      <span color={colors.primary_dark}>{name}</span>
      <Profile type="admin" />
    </Wrapper>
  );
};
