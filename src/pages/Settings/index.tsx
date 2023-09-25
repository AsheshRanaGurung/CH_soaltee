import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { Text } from "@chakra-ui/react";
import { DegradeIcon } from "@src/assets/svgs";
import styled from "styled-components";
import { colors } from "@src/theme/colors";
const Wrapper = styled.div`
  text-align: center;
  select {
    padding: 5px;
  }
  input {
    border-bottom: solid 1px;
    text-align: center;
    width: 40px;
    &:focus {
      border: none;
    }
  }
  .icon {
    display: block;
    margin: 40px auto;
  }
`;
const SettingPage = () => {
  return (
    <>
      <BreadCrumb name="Settings" />
      <Content>
        <Wrapper>
          <Text color={colors.secondary_dark}>Degrade</Text>
          <DegradeIcon className="icon" />
          Degrade to &nbsp;{" "}
          <select>
            <option>Basic Tier</option>
            <option>Degrade one step</option>
          </select>
          &nbsp; after <input value={5} /> Months on inactivity
        </Wrapper>
      </Content>
    </>
  );
};
export default SettingPage;
