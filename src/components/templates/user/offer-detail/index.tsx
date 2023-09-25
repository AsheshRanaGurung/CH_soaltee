import { useLocation } from "react-router-dom";
import { OfferTemplate } from "./OfferTemplate";
import Header from "@src/components/atoms/Header";
import { HeaderWrapper } from "../UserMain-index";
import { colors } from "@src/theme/colors";
import { Box } from "@chakra-ui/react";
import { Footer } from "../footer";

export const OfferDetail = () => {
  const { state } = useLocation();
  console.log(state);
  const { offerImage, offerName, description, subTitle } = state;
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
      <OfferTemplate
        title={offerName}
        heading="SOALTEE HERITAGE CLUB"
        subtitle={subTitle}
        description={description}
        image={offerImage}
      />
      <Footer />
    </>
  );
};
