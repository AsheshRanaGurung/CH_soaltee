import { Box, Card, CardBody, Grid, GridItem, Heading } from "@chakra-ui/react";
export const index = () => {
  return (
    <Card>
      <CardBody>
        <Box>
          <Heading fontSize={"24px"}>Profile History</Heading>
          <Grid gap={4} mt={4} templateColumns={"repeat(1,2fr)"}>
            <GridItem></GridItem>
            <GridItem></GridItem>
          </Grid>
        </Box>
      </CardBody>
    </Card>
  );
};
