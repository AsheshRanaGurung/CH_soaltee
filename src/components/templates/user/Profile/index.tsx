import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  VStack,
  ListIcon,
  ListItem,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { AwardIcon, GlobalIcon, MailIcon, PhoneIcon } from "@src/assets/svgs";
import Header from "@src/components/atoms/Header";
import { EditProfile } from "./EditProfile/Index";
import { Footer } from "../footer";
import { getUserDetail } from "@src/service/user";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "@src/service/config/api";
import { font } from "@src/theme/font";
import { colors } from "@src/theme/colors";
import { HeaderWrapper } from "../UserMain-index";
import { ReferalLayout } from "../referal";
import { ChangePassword } from "./ChangePassword";
const ProfilePage = () => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenChange,
    onOpen: onOpenChange,
    onClose: onCloseChange,
  } = useDisclosure();
  const location = useLocation();
  const { state } = location;

  const { data, refetch } = useQuery("user_detail", getUserDetail, {
    select: ({ data }) => data?.data,
  });
  useEffect(() => {
    refetch();
  }, [state, refetch]);
  const [updatedData, setUpdatedData] = useState(state);

  useEffect(() => {
    if (data) {
      setUpdatedData(data);
    }
  }, [data]);
  // const queryClient = useQueryClient();
  // const handleFormSubmit = async (data: any) => {
  //   await queryClient.refetchQueries("user_detail");
  //   setUpdatedData(data);
  // };
  const imageUrl = data?.userImageUrl !== undefined ? data?.userImageUrl : "";
  const imgProfile = `${baseURL}users/get-profile-image/${data?.userImageUrl}`;
  return (
    <>
      <Box
        background={`url(${imageList?.ProfileImage}) center center/cover no-repeat`}
        h={"300px"}
        marginTop="100px"
        position={"relative"}
      >
        <HeaderWrapper>
          <Box
            position={"fixed"}
            top={0}
            left={0}
            right={0}
            zIndex={99}
            background={colors.white}
          >
            <Header navigation={true} />
          </Box>
        </HeaderWrapper>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height="100%"
        >
          <Heading
            color={"white"}
            fontSize={"22px"}
            textAlign={"center"}
            minW={"180px"}
            p={3}
            h={"50px"}
            borderRadius={"65px"}
            background={"#979797" || data?.tierColorCode}
            fontWeight={"400"}
            fontFamily={font.cormorant}
          >
            {data?.tierName && data?.tierName.toUpperCase()}
          </Heading>
        </Box>
      </Box>
      <Box
        w={"215px"}
        height={"215px"}
        borderRadius={"50%"}
        border={"4px solid white"}
        position={"absolute"}
        top={"16%"}
        left={"5%"}
      >
        {imageUrl ? (
          <Image
            src={imgProfile}
            style={{ borderRadius: "50%", height: "100%", width: "100%" }}
          />
        ) : (
          <Avatar
            src={imageUrl}
            name={data?.fullName}
            style={{ borderRadius: "50%", width: "100%", height: "100%" }}
          />
        )}
      </Box>
      <Box>
        <Container maxW={"1400px"}>
          <VStack
            mt={"20px"}
            ml="17%"
            mb={"80px"}
            justifyContent="space-around"
            alignItems="baseline"
          >
            <Flex justifyContent={"space-between"}>
              <Box>
                <Text
                  fontSize={"4xl"}
                  textTransform={"capitalize"}
                  fontFamily={font.cormorant}
                  fontWeight="bold"
                >
                  {data?.fullName}
                </Text>
                <Text
                  fontSize={"md"}
                  marginBottom={"10px"}
                  textTransform={"capitalize"}
                  fontFamily={font.josefin}
                  fontWeight="400"
                  color={colors.black_1}
                >
                  MemberId : {data?.customerId}
                </Text>

                <Box
                  bg={"none"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  padding={"10px"}
                >
                  <List spacing={4} mb={20}>
                    <ListItem
                      color={colors.black_1}
                      display="flex"
                      alignItems="center"
                    >
                      <ListIcon as={MailIcon} fontSize="3xl" />
                      Email : &nbsp;
                      <Text fontSize={"16px"}>{data?.email}</Text>
                    </ListItem>
                    <ListItem
                      color={colors.black_1}
                      display="flex"
                      alignItems="center"
                    >
                      <ListIcon as={PhoneIcon} fontSize="3xl" />
                      Phone Number : &nbsp;
                      <Text fontSize={"16px"}>{data?.phoneNumber}</Text>
                    </ListItem>
                    <ListItem
                      color={colors.black_1}
                      display="flex"
                      alignItems="center"
                    >
                      <ListIcon as={GlobalIcon} fontSize="3xl" />
                      Nationality : &nbsp;
                      <Text fontSize={"16px"}> {data?.nationality}</Text>
                    </ListItem>
                  </List>
                </Box>
              </Box>
              <Flex gap={10} flexDirection="column">
                <Box display="flex">
                  <Button marginRight={"10px"} onClick={onOpenEdit}>
                    Edit Profile
                  </Button>
                  <Button
                    bg={"white"}
                    borderRadius={"8px"}
                    color={"#B4304B"}
                    border={"1px solid #B4304B"}
                    onClick={onOpenChange}
                  >
                    Change Password
                  </Button>
                </Box>
                <HStack
                  border={"2px solid #E9E9E9"}
                  h={"70px"}
                  minWidth={"200px"}
                  p={5}
                >
                  <AwardIcon />
                  <Text fontSize={"16px"} color={colors.black_1}>
                    Reward Points
                  </Text>
                  <Heading fontSize="2xl" fontWeight={"500"}>
                    {data?.totalRewardPoints?.toFixed(2) || "0"}
                  </Heading>
                </HStack>
              </Flex>
            </Flex>
            <HStack width="90%" gap={30}>
              <ReferalLayout />
              <Image src={imageList.ReferalImage} />
            </HStack>
          </VStack>
        </Container>
      </Box>
      <ChangePassword
        isOpen={isOpenChange}
        onClose={onCloseChange}
        data={updatedData}
        dataProfile={data}
      />
      <EditProfile
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        data={updatedData}
        dataProfile={data}
      />
      <Footer />
    </>
  );
};

export default ProfilePage;
