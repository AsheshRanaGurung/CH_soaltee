import { ArrowForwardIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { LocationIcon } from "@src/assets/svgs";
import { font } from "@src/theme/font";
import { FaRegCopyright } from "react-icons/fa";

const pages = [
  "Home",
  "Dine",
  "Explore",
  "Stay",
  "Gallery",
  "Redeem Offer",
  "Voucher",
];
export const Footer = () => {
  return (
    <Box bg={"#2E2E2D"} color={"white"} fontFamily={font.josefin}>
      <Container maxW={"1400px"}>
        <Grid
          gap={8}
          templateColumns={{
            xl: "repeat(3, 2fr )",
            md: "repeat(2,1fr)",
            sm: "repeat(1,2fr)",
          }}
          p={["30px 0"]}
        >
          <GridItem>
            <Image src={imageList.Logo} />
            {/* 
            <Flex justifyContent={"space-between"} w={"22%"} mt={"10px"}>
              <SocialCustom
                icon={
                  <Instragram
                    style={{
                      height: "20px",
                    }}
                  />
                }
              />
              <SocialCustom icon={<Facebook />} />
              <SocialCustom icon={<Twitter />} />
            </Flex> */}
          </GridItem>
          <GridItem marginTop={"30px"}>
            <List spacing={2}>
              <Heading fontSize={"18px"} marginBottom={"10px"}>
                Pages
              </Heading>
              {pages.map((item: string, index: number) => {
                return (
                  <ListItem
                    color={"white"}
                    key={index}
                    cursor={"pointer"}
                    _hover={{
                      opacity: "0.5",
                    }}
                  >
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
                <Link href="tel:9805654678">9805654678</Link>
              </ListItem>
              <ListItem color={"white"}>
                <ListIcon as={EmailIcon} color={"#A1233D"} />
                <Link href="mailto:info@srcltee.com">info@srcltee.com</Link>
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
