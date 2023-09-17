import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { EarnCard } from "./EarnCard";
import { colors } from "@src/theme/colors";
import { useQuery } from "react-query";
import { getAllOffer } from "@src/service/offer";

export const EarnPoint = () => {
  const { data } = useQuery(["offer"], getAllOffer, {
    select: ({ data }) => data.datalist,
  });
  console.log("data", data);
  return (
    <>
      <Box padding={["60px 0"]}>
        <Heading
          color={colors.gray_900}
          textAlign={"center"}
          fontSize={"44px"}
          p={["20px 0"]}
        >
          How to Earn Point
        </Heading>
        <Grid
          gap={4}
          templateColumns={{
            xl: "repeat(1,2fr 2fr 2fr 2fr)",
            md: "repeat(1,2fr 2fr)",
            sm: "repeat(1,2fr)",
          }}
          mt={8}
        >
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
