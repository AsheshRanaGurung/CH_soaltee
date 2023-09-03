import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Image,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { imageList } from "@src/assets/images";
import { FaGlobeAsia } from "react-icons/fa";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const Links = ["Home", "Earn Point", "Redeem Point"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      _hover={{
        textDecoration: "none",
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lan, setLan] = useState<boolean>(true);
  const toggleLanguage = () => {
    setLan((prev) => !prev);
  };
  return (
    <>
      <Container maxW={"1200px"}>
        <Box px={4} mt={4}>
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
              />
            </Box>
            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button
                  bg={"transparent"}
                  color={"Black"}
                  onClick={toggleLanguage}
                >
                  {lan ? "English" : "Nepali"}{" "}
                  <FaGlobeAsia style={{ marginLeft: "8px" }} />
                </Button>
              </Stack>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"md"} src={imageList.profileAvatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Container>
    </>
  );
}
