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
import DateComponent from "@src/components/atoms/DateInput";
import FormControl from "@src/components/atoms/FormControl";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useFormHook } from "@src/hooks/useFormhook";
import { useState } from "react";

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
  const currentDate = new Date();
  const initialCheckInDate = new Date(
    currentDate.setDate(currentDate.getDate() + 1)
  );
  const initialCheckOutDate = new Date(initialCheckInDate);
  initialCheckOutDate.setDate(initialCheckOutDate.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);

  const propertyList = usePropertyList();
  const changeCheckInDate = (date: any) => {
    setCheckInDate(date);
    const newDate = date && new Date(date);
    const newCheckoutDate =
      newDate && new Date(newDate.getTime() + 24 * 60 * 60 * 1000);
    setCheckOutDate(newCheckoutDate);
  };
  const changeCheckOutDate = (date: any) => {
    setCheckOutDate(date);
  };

  return (
    <>
      <Box bg={"#fff3f3"} p={["60px 0"]}>
        <Container maxW={"1400px"}>
          <Grid
            templateColumns={{
              xl: "repeat(1,1fr 1fr )",
              md: "repeat(2,2fr,1fr)",
              sm: "repeat(1,1fr)",
            }}
          >
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
                      control="reactSelect"
                      register={register}
                      name="propertyId"
                      placeholder="Choose Property"
                      label="Property Name *"
                      required
                      labelKey="name"
                      valueKey="id"
                      bg_color="white"
                      height="40px"
                      color="black"
                      error={errors.propertyId?.message || ""}
                      options={propertyList || []}
                    />
                  </GridItem>
                  <Grid gap={4} mt={4} templateColumns={"repeat(1,2fr 2fr)"}>
                    <GridItem>
                      <DateComponent
                        name="checkinDate"
                        label="Check In"
                        changeDate={changeCheckInDate}
                        error={errors.checkInDate?.message || ""}
                        endIcons="true"
                        defaultValue={checkInDate}
                        minDate={initialCheckInDate}
                      />
                    </GridItem>
                    <GridItem>
                      <DateComponent
                        name="checkOutDate"
                        label="Check In"
                        changeDate={changeCheckOutDate}
                        error={errors.checkInDate?.message || ""}
                        endIcons="true"
                        defaultValue={checkOutDate}
                        minDate={initialCheckOutDate}
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
