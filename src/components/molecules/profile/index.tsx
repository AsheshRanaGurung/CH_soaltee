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
import { baseURL } from "@src/service/config/api";

const Profile = ({ type }: any) => {
  const navigate = useNavigate();
  const { data } = useQuery("user_detail", getUserDetail, {
    select: ({ data }) => data.data,
  });
  const imageUrl = `${baseURL}users/get-profile-image/${data?.userImageUrl?.trim()}`;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"md"} src={imageUrl} name={data?.fullName} />
      </MenuButton>
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
