import { imageList } from "@src/assets/images";
import { MemberCard } from "./MemberCard";
import { Box } from "@chakra-ui/layout";
import { Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import Header from "@src/components/atoms/Header";
import { EarnPoint } from "../earnPoint";
import { SpecialOffer } from "../specialoffer/SpecialOffer";
import { Redeem } from "../rewardPoints";
import { Footer } from "../footer";
import { BookForm } from "../book-form";
import { Latestoffer } from "../footer/Latestoffer";
import { useEffect, useState } from "react";
import { colors } from "@src/theme/colors";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  div.fixed {
    background: #c4afaa;
    transition: "all 0.3s ease";
    height: 50px;
  }
`;

export const Userpage = () => {
  const [scrolled, setScrolled] = useState(false);
  function handleScroll() {
    if (window.scrollY > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HeaderWrapper>
        <Box
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          zIndex={9}
          background={scrolled ? "#c4afaa" : "transparent"}
        >
          <Header navigation={true} />
        </Box>
      </HeaderWrapper>
      <Box
        background={`${colors.secondary} url(${imageList.BackgoundImage}) center center/cover no-repeat`}
        paddingTop={16}
      >
        <Container maxW={"1400px"}>
          <MemberCard />
        </Container>
        <Box bg={colors.secondary} id="earn_point">
          <Container maxW={"1400px"}>
            <EarnPoint />
          </Container>
        </Box>
      </Box>
      <Box p={["40px 0"]}>
        <Container maxW={"1400px"}>
          <Heading color={colors.gray_900} fontSize={"44px"} m={["30px 0"]}>
            Special Offers
          </Heading>
          <Grid
            gap={6}
            mt={4}
            templateColumns={{
              xl: "repeat(1, 4fr 4fr )",
              md: "repeat(1,2fr)",
              sm: "repeat(1,2fr)",
            }}
          >
            <GridItem>
              <SpecialOffer
                title={"Let's Get Lost on Our Adventures"}
                desc={
                  "Save at least 15% on stays worldwide, from relaxing retreats to off-the-grid adventures"
                }
                ButtonText={"Claim Voucher"}
                img={imageList.Fame}
              />
            </GridItem>
            <GridItem>
              <SpecialOffer
                title={"Let's Get Lost on Our Adventures"}
                desc={
                  "Save at least 15% on stays worldwide, from relaxing retreats to off-the-grid adventures"
                }
                ButtonText={"Claim Voucher"}
                img={imageList.FooterWall}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
      <BookForm />
      <Box id="redeem_point">
        <Redeem />
      </Box>
      <Latestoffer />
      <Footer />
    </>
  );
};
