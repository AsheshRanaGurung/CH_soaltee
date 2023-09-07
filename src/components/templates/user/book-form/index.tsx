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
import { getAllProperty } from "@src/service/master-data/property";
import { useQuery } from "react-query";

export const BookForm = () => {
  const { register, errors, watch } = useFormHook({});

  const handleButtonClick = () => {
    const url = `https://bookingengine.aegis.com.np/aegis-7001?arrival_date=${
      watch("checkinDate") ? watch("checkinDate") : "2022-09-08"
    }&departure_date=${
      watch("checkoutDate") ? watch("checkoutDate") : "2022-09-09"
    }`;
    window.open(url, "_blank");
  };

  const { data: property } = useQuery("property", getAllProperty, {
    select: ({ data }) => data.data.content,
  });
  console.log("lalllaaa", property);
  const propertyList = property?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });

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
                      name="propertyId"
                      placeholder="Choose Property"
                      label="Property Name *"
                      required
                      background="white"
                      height="40px"
                      color="black"
                      error={errors.propertyId?.message || ""}
                      options={propertyList || []}
                    />
                  </GridItem>
                  <Grid gap={4} mt={4} templateColumns={"repeat(1,2fr 2fr)"}>
                    <GridItem>
                      <FormControl
                        control="input"
                        name="checkinDate"
                        defaultValue={"2023-09-08"}
                        type="date"
                        required
                        label="Check In"
                        background="white"
                        color="black"
                        padding="10px"
                        height="40px"
                        lineHeight="2"
                        register={register}
                        error={errors.checkInDate?.message || ""}
                      />
                    </GridItem>
                    <GridItem>
                      <FormControl
                        control="input"
                        name="checkoutDate"
                        type="date"
                        defaultValue={"2023-09-09"}
                        required
                        label="Check Out"
                        background="white"
                        color="black"
                        padding="10px"
                        height="40px"
                        register={register}
                        error={errors.checkOutDate?.message || ""}
                      />
                    </GridItem>
                  </Grid>
                  <Button
                    borderRadius={"0"}
                    w={"100%"}
                    p={"24px"}
                    fontWeight={"300"}
                    marginTop={"20px"}
                    onClick={handleButtonClick}
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
