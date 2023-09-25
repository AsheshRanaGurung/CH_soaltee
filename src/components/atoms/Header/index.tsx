import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { imageList } from "@src/assets/images";
// import { useState } from "react";
import Profile from "@src/components/molecules/profile";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { Link } from "react-scroll";
import { font } from "@src/theme/font";
interface Props {
  id: string;
  name: string;
  path: string | undefined;
}
const Links = [
  { id: "home", name: "Home", path: "/" },
  { id: "dine", name: "Dine", path: "/" },
  { id: "explore", name: "Explore", path: "/" },
  { id: "stay", name: "Stay", path: "/" },
  { id: "gallery", name: "Gallery", path: "/" },
  { id: "redeem_offer", name: "Redeem Offer" },
  { id: "voucher", name: "Voucher" },
  // { id: "History", name: "History", path: NAVIGATION_ROUTES.HISTORY },
];
const NavLink = (props: Props) => {
  const { id, name } = props;
  return (
    <Box
      px={2}
      py={1}
      cursor="pointer"
      fontFamily={font.josefin}
      fontWeight="600"
    >
      <Link to={id} smooth={true} duration={500} spy={true} offset={-60}>
        {name}
      </Link>
    </Box>
  );
};
export default function Header({ navigation }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <Container maxW={"1400px"}>
        <Box px={4} py={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <Box>
              <Image
                alt={"Login Image"}
                objectFit={"fill"}
                src={imageList.Logo}
                maxH={"8vh"}
                cursor={"pointer"}
                onClick={() => navigate(NAVIGATION_ROUTES.USER_DASHBOARD)}
              />
            </Box>
            {navigation && (
              <HStack spacing={8} alignItems={"center"}>
                <HStack as={"nav"} spacing={4} display={{ md: "flex" }}>
                  {Links?.map((link) => (
                    <NavLink
                      key={link.id}
                      id={link.id}
                      name={link.name}
                      path={link.path}
                    />
                  ))}
                </HStack>
              </HStack>
            )}

            <Flex alignItems={"center"}>
              {/* <Stack direction={"row"} spacing={7}>
                <Button
                  bg={"transparent"}
                  color={"Black"}
                  onClick={toggleLanguage}
                >
                  {lan ? "English" : "Nepali"}{" "}
                  <FaGlobeAsia style={{ marginLeft: "8px" }} />
                </Button>
              </Stack> */}
              <Profile />
            </Flex>
          </Flex>
          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink
                    key={link.id}
                    id={link.id}
                    name={link.name}
                    path={link.path}
                  />
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Container>
    </>
  );
}
