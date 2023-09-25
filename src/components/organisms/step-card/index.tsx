import { Box, Grid, GridItem, Container } from "@chakra-ui/react";

import { StepCard } from "../../molecules/step-card";
import { ICard } from "@src/interface/user";

export const CardStep = ({ data }: ICard) => {
  return (
    <>
      <Box padding={["60px 0"]} position="relative" zIndex={10}>
        <Container maxW={"1400px"}>
          <Grid
            gap={7}
            justifyContent="center"
            templateColumns={{
              xl: "repeat(3,1fr)",
              md: "repeat(1,2fr 2fr)",
              sm: "repeat(1,2fr)",
            }}
            mt={8}
          >
            {data.map((item, index) => (
              <GridItem key={item.key}>
                <StepCard
                  title={item.title}
                  desc={item.desc}
                  img={item.img}
                  count={index <= 9 ? `0${index + 1}` : `${index + 1}`}
                />
              </GridItem>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};
