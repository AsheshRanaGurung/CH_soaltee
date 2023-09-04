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

export const MemberShip = () => {
  return (
    <>
      <Box
        background={`#FFF3F3 url(${imageList.BackgoundImage}) center center/cover no-repeat`}
      >
        <Container maxW={"1400px"}>
          <Header />

          <MemberCard />
        </Container>
        <Box bg={"#FFF3F3"}>
          <Container maxW={"1400px"}>
            <EarnPoint />
          </Container>
        </Box>
      </Box>
      <Box p={["40px 0"]}>
        <Container maxW={"1400px"}>
          <Heading color={"#212B36"} fontSize={"44px"} m={["30px 0"]}>
            Special Offers
          </Heading>
          <Grid gap={6} mt={4} templateColumns={"repeat(1,2fr 2fr)"}>
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
      <Redeem />

      <Footer />
    </>
  );
};
