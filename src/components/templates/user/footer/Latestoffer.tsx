import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import FormControl from "@src/components/atoms/FormControl";
import { useFormHook } from "@src/hooks/useFormhook";

export const Latestoffer = () => {
  const { register, errors } = useFormHook({});
  return (
    <Box
      background={`url(${imageList.DinnerWall}) center center/cover no-repeat`}
      position={"relative"}
      p={["40px 0"]}
    >
      <Container maxW={"1400px"}>
        <Grid gap={4} templateColumns={"repeat(1,2fr 2fr)"} p={12}>
          <GridItem>
            <Heading color={"white"} fontSize={"44px"} fontWeight={"300"}>
              Get the latest offers <br></br>Sign up for our newsletter
            </Heading>
          </GridItem>
          <GridItem>
            <Heading fontSize={"18px"} color={"white"} fontWeight={"300"}>
              Hear about our latest offers by signing up to our mailing list.
            </Heading>
            <Flex>
              <FormControl
                control="input"
                type="text"
                name="emailaddress"
                register={register}
                placeholder={"Your email address"}
                error={errors.phoneNumber?.message || ""}
                required
                color="white"
                borderColor="#FFFFFFB2"
                marginTop="8px"
                height="40px"
                paddingLeft="5px"
              />
              <Button
                marginTop="8px"
                marginLeft={"5px"}
                background={"transparent"}
                border={"2px solid white"}
                borderRadius={"none"}
                fontWeight={"300"}
              >
                Subscribe{" "}
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
