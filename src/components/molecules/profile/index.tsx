import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { imageList } from "@src/assets/images";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
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
