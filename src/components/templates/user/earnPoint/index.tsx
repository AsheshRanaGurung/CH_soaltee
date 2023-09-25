import { Box, Grid, GridItem } from "@chakra-ui/react";
import { EarnCard } from "./EarnCard";
import { HeadingText } from "@src/components/molecules/heading-text";
import { ICard } from "@src/interface/user";

export const EarnPoint = ({ data }: ICard) => {
  return (
    <>
      <Box padding={["60px 0"]} position="relative" zIndex={10}>
        <HeadingText
          heading="SOALTEE HERITAGE CLUB"
          maintitle="How to Earn Points"
          titletext="Earn points using our services to level up your membership"
        />
        <Grid
          gap={4}
          templateColumns={{
            xl: "repeat(1,2fr 2fr 2fr 2fr)",
            md: "repeat(1,2fr 2fr)",
            sm: "repeat(1,2fr)",
          }}
          mt={8}
        >
          {data.map((item) => (
            <GridItem key={item.key}>
              <EarnCard title={item.title} desc={item.desc} img={item.img} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};
