import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { RedeemPoint } from "./RedeemPoint";
import { imageList } from "@src/assets/images";

export const Redeem = () => {
  return (
    <>
      <Box p={["60px 0"]}>
        <Container maxW={"1400px"}>
          <Heading
            color={"#212B36"}
            textAlign={"center"}
            paddingBottom={"10px"}
          >
            How to Redeem Points
          </Heading>
          <Grid
            gap={6}
            mt={4}
            templateColumns={{
              xl: "repeat(4, 2fr )",
              md: "repeat(2,1fr)",
              sm: "repeat(1,2fr)",
            }}
            p={["20px 0"]}
          >
            <GridItem>
              <RedeemPoint
                title={"Hotel Nights and More"}
                desc={
                  "Use points for dining, golf, spas and more during the stay"
                }
                img={imageList.FiveStart}
              />
            </GridItem>
            <GridItem>
              <RedeemPoint
                title={"Hotel Nights and More"}
                desc={
                  "Use points for dining, golf, spas and more during the stay"
                }
                img={imageList.happyImage}
              />
            </GridItem>
            <GridItem>
              <RedeemPoint
                title={"Car Rental"}
                desc={
                  "Use points for dining, golf, spas and more during the stay"
                }
                img={imageList.FameImage}
              />
            </GridItem>
            <GridItem>
              <RedeemPoint
                title={"Shopping and Gift Cards"}
                desc={
                  "Use points for dining, golf, spas and more during the stay"
                }
                img={imageList.Gift}
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
