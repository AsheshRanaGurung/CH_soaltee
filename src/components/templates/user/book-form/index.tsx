import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import FormControl from "@src/components/atoms/FormControl";
import { BackgroundTextWithImage } from "@src/components/molecules/bg-text-image";
import ReactSelect from "@src/components/atoms/Select";
import { usePropertyList } from "@src/constant/usePropertyList";
import { useFormHook } from "@src/hooks/useFormhook";
import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";
import { useState } from "react";

export const BookForm = () => {
  const { register, errors, watch, control } = useFormHook({});

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
      <Box p={["60px 0"]}>
        <Container maxW={"1400px"}>
          <Grid
            templateColumns={{
              xl: "repeat(1,1fr 1fr )",
              md: "repeat(2,2fr,1fr)",
              sm: "repeat(1,1fr)",
            }}
            background="#252525"
            alignItems="center"
          >
            <GridItem>
              <BackgroundTextWithImage
                img={imageList.ResturantWall}
                height="700px"
              >
                <Image src={imageList.Rating} mb={3} />
                <HStack gap={6}>
                  <Stack width="60%">
                    <Heading
                      fontSize="x-large"
                      marginBottom={3}
                      fontFamily={font.cormorant}
                      textTransform="capitalize"
                    >
                      Call us, it’s toll - free.
                    </Heading>
                    <Text
                      marginBottom={"15px"}
                      as="div"
                      fontFamily={font.josefin}
                    >
                      Over 30,000 people work for us in 5 different locations.
                      We provide special services worldwide with exclusive
                      services and specialist.
                    </Text>
                  </Stack>
                  <Stack>
                    <HStack gap={3}>
                      <Image src={imageList.Phone} width={35} />
                      <VStack alignItems="left">
                        <Text
                          as="div"
                          fontFamily={font.josefin}
                          color={colors.primary}
                        >
                          880 987 786 678
                        </Text>

                        <Text as="div" fontFamily={font.josefin}>
                          For More Information
                        </Text>
                      </VStack>
                    </HStack>
                  </Stack>
                </HStack>
              </BackgroundTextWithImage>
            </GridItem>
            <GridItem p={"80px"}>
              <Box h={"100%"} color={"white"} p={["20px 0"]}>
                <Heading
                  fontSize={"20px"}
                  fontWeight={"400"}
                  paddingBottom={"10px"}
                  fontFamily={font.cormorant}
                >
                  BOOK HOTEL FOR EXCITING REWARDS
                </Heading>
                <Heading
                  paddingBottom={"20px"}
                  fontSize="42px"
                  fontFamily={font.cormorant}
                >
                  We are more than just a room
                </Heading>

                <form
                  style={{
                    fontFamily: "Josefin Sans",
                  }}
                >
                  <GridItem>
                    <ReactSelect
                      control={control}
                      name="propertyId"
                      placeholder="Choose Property Name"
                      label="Property Name"
                      error={errors.propertyId?.message || ""}
                      labelKey={"name"}
                      valueKey={"id"}
                      required
                      bg_color="white"
                      height="40px"
                      color="black"
                      options={propertyList || []}
                    />
                  </GridItem>
                  <Grid gap={4} mt={4} templateColumns={"repeat(1,2fr 2fr)"}>
                    <GridItem>
                      <FormControl
                        control="date"
                        register={register}
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
                      <FormControl
                        control="date"
                        register={register}
                        name="checkOutDate"
                        label="Check Out"
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
