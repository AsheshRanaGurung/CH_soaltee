import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { EarnCard } from "./EarnCard";

export const EarnPoint = () => {
  return (
    <>
      <Box padding={["60px 0"]}>
        <Heading
          color={"#212B36"}
          textAlign={"center"}
          fontSize={"44px"}
          p={["20px 0"]}
        >
          How to Earn Point
        </Heading>
        <Grid gap={4} templateColumns={"repeat(1,2fr 2fr 2fr 2fr)"} mt={8}>
          <GridItem>
            <EarnCard
              img={imageList.PeopleCard}
              title={"Refer Friend"}
              desc={
                "Earn reward point by referring to your friends or colleague."
              }
            />
          </GridItem>
          <GridItem>
            <EarnCard
              img={imageList.IdCard}
              title={"Apply Membership"}
              desc={
                "Earn reward point by referring to your friends or colleague."
              }
            />
          </GridItem>
          <GridItem>
            <EarnCard
              img={imageList.BedCard}
              title={"First Time Booking"}
              desc={
                "Earn reward point by referring to your friends or colleague."
              }
            />
          </GridItem>
          <GridItem>
            <EarnCard
              img={imageList.LogoutCard}
              title={"Update Your Profile"}
              desc={
                "Earn reward point by referring to your friends or colleague."
              }
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};