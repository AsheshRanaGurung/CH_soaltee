import {
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
import { Footer } from "../user/footer";

const ProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        background={`url(${imageList.ProfileImage}) center center/cover no-repeat`}
        p={["50px 0"]}
        h={"300px"}
        position={"relative"}
      >
        <Header />
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
            w={"180px"}
            h={"50px"}
            p={["10px 0"]}
            borderRadius={"65px"}
            background={"#979797"}
            fontWeight={"400"}
          >
            SILVER TIER{" "}
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
        <Image src={imageList.profileAvatar} />
      </Box>
      <Box>
        <Container maxW={"1400px"}>
          <Box mt={"20px"} ml={"12%"} mb={"80px"}>
            <Flex justifyContent={"space-between"}>
              <Box>
                <Heading fontSize={"44px"} marginBottom={"30px"}>
                  Kevina Singh
                </Heading>
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
                  <Heading fontSize={"18px"}>1120</Heading>
                </Box>
                <List spacing={4}>
                  <ListItem color={"#696969"} display={"flex"}>
                    <ListIcon as={MailIcon} />
                    Email: &nbsp;
                    <Text fontSize={"16px"}>kevinsingh@gmail.com</Text>
                  </ListItem>
                  <ListItem color={"#696969"} display={"flex"}>
                    <ListIcon as={PhoneIcon} />
                    Phone Number: &nbsp;
                    <Text fontSize={"16px"}>98102291029</Text>
                  </ListItem>
                  <ListItem color={"#696969"} display={"flex"}>
                    <ListIcon as={LocationIcon} />
                    Nationality: &nbsp;
                    <Text fontSize={"16px"}> Nepali</Text>
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Button marginRight={"10px"} onClick={onOpen}>
                  Edit Profile
                </Button>
                <Button
                  bg={"white"}
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

      <EditProfile isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  );
};

export default ProfilePage;
