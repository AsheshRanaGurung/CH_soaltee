import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router-dom";
import { getUserDetail } from "@src/service/user";
import { useQuery } from "react-query";

const Profile = ({ type }: any) => {
  const navigate = useNavigate();
  const { data } = useQuery("user_detail", getUserDetail, {
    select: ({ data }) => data.data,
  });
  //need to fetch this from api, only a quickfix
  const imageUrl = localStorage.getItem("imageName") ?? "";
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"md"} src={imageUrl} />
      </MenuButton>
      <MenuList>
        {type !== "admin" && (
          <MenuItem
            onClick={() =>
              navigate(NAVIGATION_ROUTES.USER_PROFILE, {
                state: data,
              })
            }
          >
            Profile
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            localStorage.removeItem("token"), navigate(NAVIGATION_ROUTES.LOGIN);
            localStorage.removeItem("imageName");
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default Profile;
