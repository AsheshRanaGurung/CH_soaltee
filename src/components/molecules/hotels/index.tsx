import { Box, Container, Grid, GridItem, Image } from "@chakra-ui/react";
import { HeadingText } from "@src/components/molecules/heading-text";
import { HotelImage } from "@src/constant/index";

export const Hotel = () => {
  return (
    <>
      <Box p={["60px 0"]}>
        <Container maxW={"1400px"}>
          <HeadingText heading="SOALTEE HERITAGE CLUB" maintitle="Our Hotels" />
          <Grid
            mt={4}
            gap={8}
            justifyContent="center"
            templateColumns={{
              xl: "repeat(4, 250px )",
              md: "repeat(2,1fr)",
              sm: "repeat(1,2fr)",
            }}
            p={["20px 0"]}
          >
            {HotelImage.map((item) => (
              <GridItem key={item.key}>
                <Image src={item.img} margin="0 auto" />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
