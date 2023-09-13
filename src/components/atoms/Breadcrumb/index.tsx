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

  .subname {
    line-height: 24px;
    color: ${colors.primary};
    font-size: 16px;
  }
  .name-subname {
    color: ${colors.secondary_dark};
  }
  .name {
    color: ${colors.primary};
  }
`;
interface IBreadCrumb {
  name?: string;
  subname?: string;
}

export const BreadCrumb = ({ name, subname }: IBreadCrumb) => {
  return (
    <Wrapper>
      <div className={`${subname ? "name-subname" : "name"}`}>
        {name}
        {subname && <span> / </span>}
        {subname && <span className="subname">{subname}</span>}
      </div>
      <Profile type="admin" />
    </Wrapper>
  );
};
