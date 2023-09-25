import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { RedeemPoint } from "./RedeemPoint";
import { ICard } from "@src/interface/user";

export const Redeem = ({ data }: ICard) => {
  return (
    <>
      <Box>
        <Container maxW={"1400px"}>
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
            {data.map((item: any) => (
              <GridItem key={item.key}>
                <RedeemPoint
                  title={item.title}
                  desc={item.desc}
                  img={item.img}
                />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
