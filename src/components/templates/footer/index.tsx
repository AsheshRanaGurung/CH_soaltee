import { ArrowForwardIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { LocationIcon } from "@src/assets/svgs";
import { SocialCustom } from "@src/components/atoms/Icons/SocialCustom";
import { FaFacebookF, FaInstagram, FaRegCopyright } from "react-icons/fa";
import { Latestoffer } from "./Latestoffer";

const pages = ["Home", "Earn Points", "Redeem Points"];
export const Footer = () => {
  return (
    <Box bg={"#2E2E2D"} color={"white"}>
      <Latestoffer />
      <Container maxW={"1400px"}>
        <Grid gap={8} templateColumns={"repeat(1,2fr 2fr 2fr)"} p={["30px 0"]}>
          <GridItem>
            <Image src={imageList.FooterLogo} />
            <Text w={"350px"}>
              Over 30,000 people work for us in 5 different locations. We
              provide special services worldwide with exclusive services and
              specialist
            </Text>
            <Flex justifyContent={"space-between"} w={"22%"} mt={"10px"}>
              <SocialCustom
                icon={
                  <FaFacebookF
                    style={{
                      color: "white",
                    }}
                  />
                }
              />
              <SocialCustom
                icon={
                  <FaInstagram
                    style={{
                      color: "white",
                    }}
                  />
                }
              />
              <SocialCustom
                icon={
                  <EmailIcon
                    style={{
                      color: "white",
                    }}
                  />
                }
              />
            </Flex>
          </GridItem>
          <GridItem marginTop={"30px"}>
            <List spacing={2}>
              <Heading fontSize={"18px"} marginBottom={"10px"}>
                Pages
              </Heading>
              {pages.map((item: string, index: number) => {
                return (
                  <ListItem color={"white"} key={index}>
                    <ListIcon as={ArrowForwardIcon} />
                    {item}
                  </ListItem>
                );
              })}
            </List>
          </GridItem>
          <GridItem marginTop={"30px"}>
            <List spacing={3} marginTop={"5px"}>
              <Heading
                fontSize={"14px"}
                fontWeight={"bold"}
                textTransform={"uppercase"}
              >
                get in touch
              </Heading>
              <Text fontSize={"14px"}>
                sign up now to recieve special offers & promotions
              </Text>
              <ListItem color={"white"}>
                <ListIcon as={PhoneIcon} color={"#A1233D"} />
                9805654678
              </ListItem>
              <ListItem color={"white"}>
                <ListIcon as={EmailIcon} color={"#A1233D"} />
                info@srcltee.com{" "}
              </ListItem>
              <ListItem color={"white"}>
                <ListIcon as={LocationIcon} color={"#A1233D"} />
                main location{" "}
              </ListItem>
            </List>
          </GridItem>
        </Grid>
      </Container>
      <Box bg={"black"}>
        <Container maxW={"1400px"}>
          <Heading
            fontSize={"16px"}
            p={["15px 0"]}
            color={"#F3F4F2"}
            fontWeight={"400"}
            display={"flex"}
          >
            <FaRegCopyright style={{ marginRight: "5px" }} />
            {new Date().getFullYear()} The Soaltee Hotels & Resorts. All Rights
            Reserved
          </Heading>
        </Container>
      </Box>
    </Box>
  );
};
