import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { AwardIcon, LocationIcon, MailIcon, PhoneIcon } from "@src/assets/svgs";
import Header from "@src/components/atoms/Header";
import { EditProfile } from "./EditProfile/Index";
import { Footer } from "../footer";
import { getUserDetail } from "@src/service/user";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { baseURL } from "@src/service/config/api";
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

  const imageUrl = data?.userImageUrl !== undefined ? data?.userImageUrl : "";
  const imgProfile = `${baseURL}users/get-profile-image/${data?.userImageUrl}`;
  return (
    <>
      <Box
        background={`url(${imageList?.ProfileImage}) center center/cover no-repeat`}
        h={"300px"}
        position={"relative"}
      >
        <Header navigation={false} />
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={"50px"}
        >
          <Heading
            color={"white"}
            fontSize={"22px"}
            textAlign={"center"}
            minW={"180px"}
            p={3}
            h={"50px"}
            borderRadius={"65px"}
            background={"#979797"}
            fontWeight={"400"}
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
        top={"20%"}
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
            name="Profile"
            style={{ borderRadius: "50%", width: "100%", height: "100%" }}
          />
        )}
      </Box>
      <Box>
        <Container maxW={"1400px"}>
          <Box mt={"20px"} ml={"18%"} mb={"80px"}>
            <Flex justifyContent={"space-between"}>
              <Box>
                <Text
                  fontSize={"3xl"}
                  marginBottom={"10px"}
                  textTransform={"capitalize"}
                >
                  {data?.fullName}
                </Text>
                <Box
                  bg={"none"}
                  border={"2px solid #E9E9E9"}
                  h={"70px"}
                  w={"200px"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  padding={"10px"}
                  borderRadius={"8px"}
                  marginBottom={"20px"}
                >
                  <AwardIcon />
                  <Text fontSize={"16px"} color={"#696969"}>
                    Reward Points
                  </Text>
                  <Heading fontSize={"18px"} fontWeight={"500"}>
                    {data?.totalRewardPoints || "0"}
                  </Heading>
                </Box>
                <List spacing={4}>
                  <ListItem color={"#696969"} display={"flex"}>
                    <ListIcon as={MailIcon} />
                    Email: &nbsp;
                    <Text fontSize={"16px"}>{data?.email}</Text>
                  </ListItem>
                  <ListItem color={"#696969"} display={"flex"}>
                    <ListIcon as={PhoneIcon} />
                    Phone Number: &nbsp;
                    <Text fontSize={"16px"}>{data?.phoneNumber}</Text>
                  </ListItem>
                  <ListItem color={"#696969"} display={"flex"}>
                    <ListIcon as={LocationIcon} />
                    Nationality: &nbsp;
                    <Text fontSize={"16px"}> {data?.nationality}</Text>
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Button marginRight={"10px"} onClick={onOpenEdit}>
                  Edit Profile
                </Button>
                <Button
                  bg={"white"}
                  onClick={onOpenChange}
                  borderRadius={"8px"}
                  color={"#B4304B"}
                  border={"1px solid #B4304B"}
                >
                  Change Password
                </Button>
              </Box>
            </Flex>
          </Box>
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
