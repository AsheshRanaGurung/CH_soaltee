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
import { getImage } from "@src/service/image";
import { useState, useEffect } from "react";
import { colors } from "@src/theme/colors";

export const MemberCard = () => {
  const { data } = useQuery("user_detail", getUserDetail, {
    select: ({ data }) => data.data,
  });
  const {
    tierName,
    fullName,
    totalRewardPoints,
    customerId,
    nextMembershipTier,
    pointsToNextTier,
    tierImage,
  } = data ?? "";
  const { data: imageData } = useQuery("image", () => getImage(tierImage), {
    enabled: !!tierImage,
  });
  const [imageSrc, setImageSrc] = useState<string | null>(tierImage);

  useEffect(() => {
    const blobData = new Blob([imageData?.data], { type: "image/jpeg" });

    const imageUrl = URL.createObjectURL(blobData);

    // Set the URL as the image source
    setImageSrc(imageUrl);

    // Clean up the URL when the component unmounts
    return () => {
      URL.revokeObjectURL(imageUrl);
      setImageSrc("");
    };
  }, [imageData]);
  const progressWidth =
    (totalRewardPoints / (totalRewardPoints + pointsToNextTier)) * 100;
  return (
    <Grid
      gap={8}
      templateColumns={"repeat(1,4fr 2fr)"}
      paddingBottom={"80px"}
      paddingTop={"80px"}
    >
      <GridItem position={"relative"}>
        <Card bg={colors.card_bg}>
          <CardBody>
            <Grid gap={4} mt={4} templateColumns={"repeat(1,2fr 4fr)"}>
              <GridItem>
                <Card
                  width={"430px"}
                  height={"255px"}
                  borderRadius={"16px"}
                  position={"relative"}
                  border="none"
                  boxShadow="none"
                  background="transparent"
                  _before={{
                    content: `''`,
                    height: "100%",
                    width: "100%",
                    bg: `url(${
                      imageSrc || imageList.DummyTier
                    }) no-repeat right`,
                  }}
                >
                  <Box position={"absolute"} zIndex={"1"}>
                    <CardHeader color={colors.light_white}></CardHeader>
                    <CardBody>
                      <Box color={colors.light_white}>
                        <Text fontSize={"14px"} fontStyle={"italic"}>
                          Member Name
                        </Text>
                        <Heading fontSize={"21px"}>
                          {fullName?.toUpperCase()}
                        </Heading>
                      </Box>
                      <Box color={colors.light_white} marginTop={"25px"}>
                        <Text fontSize={"14px"} fontStyle={"italic"}>
                          Member Number{" "}
                        </Text>
                        <Heading fontSize={"21px"}>{customerId}</Heading>
                      </Box>
                    </CardBody>
                  </Box>
                </Card>
              </GridItem>
              <GridItem>
                <Box marginTop={"10px"}>
                  <Heading
                    color={colors.gray_900}
                    fontSize={"28px"}
                    fontStyle={"italic"}
                    fontWeight={"400"}
                    marginBottom={"20px"}
                  >
                    {tierName?.toUpperCase()}
                  </Heading>
                  <Progress
                    value={progressWidth}
                    colorScheme="green"
                    size="sm"
                  />
                  <Text
                    fontSize={"14px"}
                    color={colors.gray_600}
                    marginTop={"8px"}
                    marginLeft={"5px"}
                  >
                    Earn {pointsToNextTier} points to reach {nextMembershipTier}
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
                  <Link
                    color={colors.primary}
                    display={"block"}
                    marginTop={"20px"}
                  >
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
            cursor={"pointer"}
          />
        </Box>
      </GridItem>
      <GridItem>
        <Card bg={colors.card_bg} borderRadius={"14px"} h={"315px"}>
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
