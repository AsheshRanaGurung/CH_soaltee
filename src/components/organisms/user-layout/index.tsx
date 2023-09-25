import Header from "@src/components/organisms/header";
import styled from "styled-components";
import { colors } from "@src/theme/colors";
import { Box } from "@chakra-ui/layout";
import { Footer } from "@src/components/organisms/footer";

export const HeaderWrapper = styled.div`
  div.fixed {
    background: ${colors.white};
    transition: "all 0.3s ease";
    height: 50px;
  }
`;
export const UserLayout = ({ children }: any) => {
  return (
    <>
      <HeaderWrapper>
        <Box
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          zIndex={99}
          background={colors.white}
        >
          <Header navigation={true} />
        </Box>
      </HeaderWrapper>
      {children}
      <Footer />
    </>
  );
};
