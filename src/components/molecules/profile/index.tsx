import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router-dom";
import { getUserDetail } from "@src/service/user";
import { useQuery } from "react-query";
import { Text } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "@src/interface/decodedToken";
import { FaAngleDown, FaQrcode } from "react-icons/fa";
import { getStaffQR } from "@src/service/staff-management";
import QRCode from "react-qr-code";
import { CopyIcon, DownloadIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import toast from "react-hot-toast";
import { colors } from "@src/theme/colors";
import html2canvas from "html2canvas";

const Profile = ({ type }: any) => {
  const navigate = useNavigate();
  const { data } = useQuery("user_detail", getUserDetail, {
    select: ({ data }) => data.data,
  });
  const { data: QRData } = useQuery("user_qr_detail", getStaffQR, {
    select: ({ data }) => data.data,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const imageUrl = `${data?.userImageUrl}`;

  const isAuthenticated = localStorage.getItem("token");
  const role = isAuthenticated && jwt_decode<DecodedToken>(isAuthenticated);

  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const qrCodeElement = qrCodeRef.current;
      html2canvas(qrCodeElement).then((canvas) => {
        const qrCodeDataUri = canvas.toDataURL("image/png");
        const anchor = document.createElement("a");
        anchor.href = qrCodeDataUri;
        anchor.download = "qrcode.png";
        anchor.click();
      });
    }
  };

  const textInputRef = useRef(null);

  const copyToClipboard = async () => {
    if (textInputRef.current) {
      const textToCopy = QRData?.referrallink;

      try {
        await navigator.clipboard.writeText(textToCopy);
        toast.success("Copied!", {
          position: "bottom-center",
          style: {
            border: "1px solid green",
            padding: "10px",
          },
        });
      } catch (err) {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text to clipboard");
      }
    }
  };

  return (
    <Menu>
      <Box display={"flex"} gap={5} alignItems={"center"}>
        {role && role?.role?.length > 0 && role?.role?.includes("ADMIN") && (
          <>
            <FaQrcode
              style={{ width: "25px", height: "25px", cursor: "pointer" }}
              onClick={onOpen}
            />
            {QRData && (
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader style={{ borderBottom: "solid 1px #ccc" }}>
                    Invite Members
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box display={"flex"}>
                      <Box
                        ref={qrCodeRef}
                        style={{
                          display: "block",
                          margin: "auto",
                          marginTop: "100px",
                        }}
                      >
                        <QRCode
                          value={QRData?.referrallink}
                          size={240}
                          style={{
                            display: "block",
                            margin: "auto",
                          }}
                        />
                      </Box>
                      <Button
                        mt={4}
                        onClick={downloadQRCode}
                        bg={"green"}
                        position="absolute"
                        right="10px"
                        top=" 55px"
                        leftIcon={<DownloadIcon />}
                        fontSize={"12px"}
                        height="30px"
                      >
                        Download QR
                      </Button>
                    </Box>
                    <Box
                      display={"flex"}
                      gap={2}
                      margin="15px"
                      alignItems={"center"}
                    >
                      <Box
                        ref={textInputRef}
                        borderBottom={"solid 1px #ccc"}
                        bg={" #F3F3F3"}
                        padding={"5px"}
                      >
                        {QRData?.referrallink}
                        {/* {
                          "http://172.30.1.9:3050/signup?&pid=6jmsEBQmZUYseQUOF7kCEQ=="
                        } */}
                      </Box>
                      <Button
                        onClick={copyToClipboard}
                        position={"relative"}
                        bg={colors.secondary}
                        borderRadius={"50%"}
                        width="40px"
                        height="40px"
                      >
                        <CopyIcon color={colors.primary} />
                      </Button>
                    </Box>
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
          </>
        )}{" "}
        <Avatar size={"md"} src={imageUrl} name={data?.fullName} />
        <Text>{data?.fullName}</Text>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <FaAngleDown />
        </MenuButton>
      </Box>
      <MenuList>
        {type !== "admin" && (
          <>
            <MenuItem
              onClick={() =>
                navigate(NAVIGATION_ROUTES.USER_PROFILE, {
                  state: data,
                })
              }
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() =>
                navigate(NAVIGATION_ROUTES.HISTORY, {
                  state: data,
                })
              }
            >
              History
            </MenuItem>
          </>
        )}
        <MenuItem
          onClick={() => {
            localStorage.removeItem("token"), navigate(NAVIGATION_ROUTES.LOGIN);
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default Profile;
