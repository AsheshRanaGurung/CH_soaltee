import Header from "@src/components/organisms/header";
import styled from "styled-components";
import { colors } from "@src/theme/colors";
import { Box } from "@chakra-ui/layout";
import { Footer } from "@src/components/organisms/footer";
import { useContext, useState } from "react";
import { PageParamsContext } from "@src/hooks/useContext";

export const HeaderWrapper = styled.div`
  div.fixed {
    background: ${colors.white};
    transition: "all 0.3s ease";
    height: 50px;
  }
`;
export const UserLayout = ({ children }: any) => {
  const [pageParams, setPageParams] = useState({
    limit: 10,
    page: 1,
  });
  return (
    <>
      <PageParamsContext.Provider value={{ pageParams, setPageParams }}>
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
      </PageParamsContext.Provider>
    </>
  );
};

export const usePageParams = () => {
  const context = useContext(PageParamsContext);
  if (!context) {
    throw new Error("usePageParams must be used within a PageParamsProvider");
  }
  return context;
};
