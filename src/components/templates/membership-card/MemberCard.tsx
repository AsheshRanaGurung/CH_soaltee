import { Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { imageList } from "@src/assets/images";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  ListItem,
  Progress,
  UnorderedList,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import { getUserDetail } from "@src/service/user";
export const MemberCard = () => {
  const { data } = useQuery("user_detail", getUserDetail, {
    select: ({ data }) => data.data,
  });
  const { tierName, fullName, totalRewardPoints } = data ?? "";

  return (
    <Grid
      gap={8}
      templateColumns={"repeat(1,4fr 2fr)"}
      paddingBottom={"80px"}
      paddingTop={"80px"}
    >
      <GridItem position={"relative"}>
        <Card bg={"#FFFFFFAD"}>
          <CardBody>
            <Grid gap={4} mt={4} templateColumns={"repeat(1,2fr 4fr)"}>
              <GridItem>
                <Card
                  width={"430px"}
                  height={"255px"}
                  borderRadius={"16px"}
                  position={"relative"}
                  background={
                    " linear-gradient(45deg, rgba(105,105,105,1) 45%, rgba(173,173,173,1) 51%, rgba(198,198,198,1) 56%, rgba(0,0,0,1) 98%)"
                  }
                  _before={{
                    content: `''`,
                    position: "absoulte",
                    height: "inherit",
                    width: "100%",
                    bg: `url(${imageList.logoCardIcon}) no-repeat right`,
                  }}
                >
                  <Box position={"absolute"} zIndex={"1"}>
                    <CardHeader color={"#F5F5F5"}></CardHeader>
                    <CardBody>
                      <Box color={"#F5F5F5"}>
                        <Text fontSize={"14px"} fontStyle={"italic"}>
                          Member Name
                        </Text>
                        <Heading fontSize={"21px"}>
                          {fullName?.toUpperCase()}
                        </Heading>
                      </Box>
                      <Box color={"#F5F5F5"} marginTop={"25px"}>
                        <Text fontSize={"14px"} fontStyle={"italic"}>
                          Member Number{" "}
                        </Text>
                        <Heading fontSize={"21px"}>8900002123128900</Heading>
                      </Box>
                    </CardBody>
                  </Box>
                </Card>
              </GridItem>
              <GridItem>
                <Box marginTop={"10px"}>
                  <Heading
                    color={"#212B36"}
                    fontSize={"28px"}
                    fontStyle={"italic"}
                    fontWeight={"400"}
                    marginBottom={"20px"}
                  >
                    {tierName?.toUpperCase()}
                  </Heading>
                  <Progress value={80} colorScheme="green" size="sm" />
                  <Text
                    fontSize={"14px"}
                    color={"#4A5568"}
                    marginTop={"8px"}
                    marginLeft={"5px"}
                  >
                    Earn 550 points to reach Gold
                  </Text>

                  <Button padding={"30px"} marginTop={"40px"}>
                    <Image
                      src={imageList.AwardIcon}
                      w={"22px"}
                      height={"22px"}
                    />
                    <Text
                      fontWeight={"400"}
                      fontSize={"16px"}
                      marginLeft={"10px"}
                      marginRight={"15px"}
                    >
                      Reward Points
                    </Text>{" "}
                    {totalRewardPoints}
                  </Button>
                  <Link color={"#A1233D"} display={"block"} marginTop={"20px"}>
                    Click here to redeem
                  </Link>
                </Box>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
        <Box>
          <ArrowForwardIcon
            position={"absolute"}
            w={"50px"}
            h={"50px"}
            background={"white"}
            padding={"15px"}
            borderRadius={"6px"}
            right={"-15px"}
            top={"50%"}
          />
        </Box>
      </GridItem>
      <GridItem>
        <Card bg="#FFFFFFAD" borderRadius={"14px"} h={"315px"}>
          <CardBody p={"48px"}>
            <Heading fontWeight={"600"} fontSize={"24px"} marginBottom={"10px"}>
              Membership card Rules*
            </Heading>
            <UnorderedList>
              <ListItem>Reach each tier and enjoy our free services</ListItem>
              <ListItem>Earn points based on services you use</ListItem>
              <ListItem>Redeem your points with Soaltee loyalty</ListItem>
              <ListItem>Earn points based on services you use</ListItem>
              <ListItem> Spend minimum 8,000 to earn points</ListItem>
            </UnorderedList>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
