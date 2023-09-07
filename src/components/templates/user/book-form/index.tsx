import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import FormControl from "@src/components/atoms/FormControl";
import { useFormHook } from "@src/hooks/useFormhook";

export const BookForm = () => {
  const { register, errors } = useFormHook({});
  return (
    <>
      <Box bg={"#fff3f3"} p={["60px 0"]}>
        <Container maxW={"1400px"}>
          <Grid templateColumns={"repeat(1,2fr 2fr)"}>
            <GridItem>
              <Box>
                <Image src={imageList.ResturantWall} h={"700px"} w={"100%"} />
              </Box>
            </GridItem>
            <GridItem p={"80px"} bg={"#252525"}>
              <Box h={"100%"} color={"white"} p={["20px 0"]}>
                <Heading
                  fontSize={"20px"}
                  fontWeight={"400"}
                  paddingBottom={"10px"}
                >
                  BOOK HOTEL FOR EXCITING REWARDS
                </Heading>
                <Heading paddingBottom={"20px"}>
                  We are more than just a room
                </Heading>
                <form>
                  <GridItem>
                    <FormControl
                      control="select"
                      register={register}
                      name="nationality"
                      placeholder="Choose your nationality"
                      label="Property Name *"
                      required
                      background="white"
                      height="40px"
                      color="black"
                      error={errors.nationality?.message || ""}
                      options={[]}
                    />
                  </GridItem>
                  <Grid gap={4} mt={4} templateColumns={"repeat(1,2fr 2fr)"}>
                    <GridItem>
                      <FormControl
                        control="input"
                        name="fullName"
                        type="date"
                        required
                        placeholder="Enter your full name"
                        label="Check In"
                        background="white"
                        color="black"
                        padding="10px"
                        height="40px"
                        lineHeight="2"
                        register={register}
                        error={errors.fullName?.message || ""}
                      />
                    </GridItem>
                    <GridItem>
                      <FormControl
                        control="input"
                        name="fullName"
                        type="date"
                        required
                        placeholder="Enter your full name"
                        label="Check Out"
                        background="white"
                        color="black"
                        padding="10px"
                        height="40px"
                        register={register}
                        error={errors.fullName?.message || ""}
                      />
                    </GridItem>
                  </Grid>
                  <Button
                    borderRadius={"0"}
                    w={"100%"}
                    p={"24px"}
                    fontWeight={"300"}
                    marginTop={"20px"}
                  >
                    Check Availability
                  </Button>
                </form>
              </Box>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
