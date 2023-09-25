import { Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { imageList } from "@src/assets/images";
import Icons from "@src/components/atoms/Icons";
import styled from "styled-components";

import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  ListItem,
  Progress,
  Stack,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";

import { colors } from "@src/theme/colors";
import { font } from "@src/theme/font";
import { LockIcon } from "@chakra-ui/icons";
import { PasswordViewIcon } from "@src/components/atoms/Password";
const IconWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
`;
const ToggleIconWrapper = styled.div`
  button {
    color: ${colors.white};
    font-size: 20px;
  }
`;

export const MemberCard = ({
  image,
  tierName,
  fullName,
  customerId,
  pointsToNextTier,
  tierDescription,
  totalRewardPoints,
  nextMembershipTier,
}: any) => {
  const progressWidth =
    (totalRewardPoints / (totalRewardPoints + pointsToNextTier)) * 100;
  const { isOpen: isVisible, onToggle: onToggleVisibility } = useDisclosure();
  return (
    <Grid bg="transparent" gap={8} paddingBottom={"80px"} paddingTop={"80px"}>
      <GridItem
        position={"relative"}
        border={`1px solid #FFF0E5AD`}
        borderRadius={16}
        py={5}
        _after={{
          content: `""`,
          position: "absolute",
          width: "100%",
          borderRadius: "16px",
          background: "rgba(255, 228, 208, 0.23)",
          backdropFilter:
            tierName === nextMembershipTier ? "none" : "blur(5px)",
          top: 0,
          height: "100%",
        }}
      >
        <Card
          background="transparent"
          zIndex={tierName === nextMembershipTier ? 0 : 3}
        >
          <CardBody>
            <Grid gap={16} mt={4} templateColumns={"repeat(1,2fr 4fr 1fr)"}>
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
                    bg: `url(${image || imageList.DummyTier}) no-repeat right`,
                  }}
                >
                  <IconWrapper>
                    {tierName === nextMembershipTier && (
                      <Icons icon={<LockIcon />} />
                    )}
                  </IconWrapper>
                  <Box position={"absolute"} zIndex={"1"}>
                    <CardBody pl={8}>
                      <Box color={colors.light_white} pt={4}>
                        <Text fontSize="md" mb="2">
                          Heritage Club Member Card
                        </Text>
                        <HStack gap={3} mb={3}>
                          <Image src={imageList.Trophy} />
                          <Heading fontSize="xl" textTransform="uppercase">
                            {tierName} tier
                          </Heading>
                        </HStack>
                        <Text fontSize={"14px"} fontFamily={font.cormorant}>
                          Member Name
                        </Text>
                        <Heading fontSize={"18px"}>
                          {fullName?.toUpperCase()}
                        </Heading>
                      </Box>
                      <Box color={colors.light_white} marginTop={"10px"}>
                        <Text fontSize={"14px"} fontFamily={font.cormorant}>
                          Member Number
                        </Text>
                        <Heading fontSize={"18px"}>{customerId}</Heading>
                      </Box>
                    </CardBody>
                  </Box>
                </Card>
              </GridItem>
              <GridItem>
                <Box marginTop={"10px"}>
                  <Heading
                    color={colors.white}
                    fontSize={"34px"}
                    fontWeight={"400"}
                    marginBottom={"20px"}
                    fontFamily={font.cormorant}
                  >
                    {tierName?.toUpperCase()} TIER
                  </Heading>
                  <Progress
                    value={progressWidth}
                    colorScheme="green"
                    size="sm"
                  />
                  <Stack gap={6}>
                    <Text
                      color={colors.white}
                      fontWeight="600"
                      marginTop={"8px"}
                      marginLeft={"5px"}
                    >
                      Earn {pointsToNextTier} points to reach{" "}
                      {nextMembershipTier}
                    </Text>
                    {tierDescription && (
                      <UnorderedList
                        color={colors.white}
                        fontSize="sm"
                        fontWeight="400"
                      >
                        <ListItem>{tierDescription}</ListItem>
                      </UnorderedList>
                    )}
                  </Stack>
                </Box>
              </GridItem>
              <GridItem>
                <Box marginTop={"10px"}>
                  <Stack
                    background={colors.primary}
                    color={colors.white}
                    borderRadius="12px 12px 0 0"
                    p={5}
                  >
                    <Text>Reward Points</Text>
                    <HStack>
                      <Heading>
                        {isVisible
                          ? totalRewardPoints?.toFixed(2)
                          : totalRewardPoints
                              ?.toFixed(2)
                              ?.toString()
                              .replace(/[0-9]/g, "X")}
                      </Heading>
                      <ToggleIconWrapper>
                        <PasswordViewIcon
                          isVisible={isVisible}
                          onToggle={onToggleVisibility}
                        />
                      </ToggleIconWrapper>
                    </HStack>
                  </Stack>
                  <Button
                    variant="outlined"
                    color={colors.black}
                    display={"block"}
                    width="100%"
                    borderRadius="0 0 12px 12px"
                    height="50px"
                    border="none"
                    fontFamily={font.cormorant}
                  >
                    View Transaction History
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
