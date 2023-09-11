import { imageList } from "@src/assets/images";
import styled from "styled-components";
import { Text } from "@chakra-ui/layout";
import { colors } from "@src/theme/colors";
import Icons from "@src/components/atoms/Icons";
import { AiFillMail, AiOutlinePlus } from "react-icons/ai";
import { FaGlobeAsia, FaPhoneAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { useLocation } from "react-router";
import { useDisclosure, Box, Heading } from "@chakra-ui/react";
import ModalForm from "@src/components/organisms/modal";
import ProfileForm from "@src/components/templates/admin/member-management/member-profile/add-point";
import {
  fetchOneMember,
  getAllMemberHistory,
} from "@src/service/member-management";
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import MemberHistory from "../member-history";
import { ProfileImage } from "@src/components/atoms/ProfileImage";

export const Wrapper = styled.div`
  position: relative;
  .profile-img {
    position: absolute;
    top: -75px;
    left: 51px;
  }
  .profile-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile-container {
    width: 243px;
    height: 243px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 68px;
    letter-spacing: 4px;
    font-weight: 800;
    color: ${colors.white};
    // border: 1px solid ${colors.light_gray_border};
    background-color: ${colors.primary};
  }
  @media screen and (max-width: 720px) {
    .profile-img {
      width: 100px;
      display: block;
      margin: auto;
      position: inherit;
      margin-top: 50px;
    }
  }
`;
const Card = styled.div`
  margin: 40px 175px;
  background: ${colors.white};
  padding: 50px 0px;
  .profile-card {
    margin-left: 150px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }
  .basic-info {
    margin-left: 150px;
    margin-top: 10px;
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto;
    gap: 10px 40px;
  }
  .basic-info-item {
    padding-top: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .detail-card {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }
  .reward-card {
    border: solid 1px ${colors.light_gray_border};
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 7px;
  }
  .reward-card-title {
    display: flex;
    height: 24px;
    justify-content: center;
    gap: 10px;
  }

  @media screen and (max-width: 720px) {
    padding: 30px 0px;
    margin: -60px 0px 0px 0px;
    .profile-card {
      flex-direction: column;
      margin-left: 20px;
    }
    .basic-info {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
    .detail-card {
      flex-direction: column;
    }
    .reward-card {
      justify-content: center;
      margin-top: 15px;
      padding: 10px;
      margin-left: 20px;
    }
  }
`;
const HistoryCard = styled.div`
  margin: 40px 175px;
  background: ${colors.white};
  padding: 25px 0px;
`;
const MemberProfile = () => {
  const location = useLocation();
  const { state } = location;
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileModalOpen,
    onClose: onProfileModalClose,
  } = useDisclosure();

  const { data, refetch } = useQuery(
    "member",
    () => fetchOneMember({ id: state.id }),
    {
      select: ({ data }) => {
        return data.data;
      },
    }
  );
  useEffect(() => {
    refetch();
  }, [state, refetch]);

  const [rewardPoints, setRewardPoints] = useState(0);
  useEffect(() => {
    if (data) {
      setRewardPoints(data.totalRewardPoints?.toFixed(2));
    }
  }, [data]);

  const { data: historyData } = useQuery(
    "member_history",
    getAllMemberHistory,
    {
      select: ({ data }) => {
        return data.data;
      },
    }
  );
  const queryClient = useQueryClient();
  const handleFormSubmit = async (data: any) => {
    await queryClient.refetchQueries("member");
    setRewardPoints((prevData) => prevData + data);
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        background={`url(${imageList.ProfileBackground}) center center/cover no-repeat`}
        h={"130px"}
        position={"relative"}
      >
        <Heading
          color={"white"}
          fontSize={"20px"}
          textAlign={"center"}
          minWidth="145px"
          h={"45px"}
          p={["10px 0"]}
          borderRadius={"65px"}
          background={"#979797"}
          fontWeight={"400"}
        >
          {data?.tierName.toUpperCase()}
        </Heading>
      </Box>
      <Wrapper>
        <ProfileImage name={state?.fullName} />
        <Card>
          <div className="profile-card">
            <div>
              <Text fontSize={"3xl"}>{state.fullName}</Text>
              <Text>{data?.tierName} Tier</Text>
            </div>
            <div>
              <Button
                type="submit"
                className="button"
                w="100%"
                borderRadius="5px"
                leftIcon={<AiOutlinePlus />}
                onClick={onProfileModalOpen}
              >
                Add Points
              </Button>
            </div>
          </div>
          <div className="detail-card">
            <div className="basic-info">
              <div className="basic-info-item">
                <Icons icon={<AiFillMail />} />
                <Text color={colors.secondary_dark}>Email : {state.email}</Text>
              </div>
              <div className="basic-info-item">
                <Icons icon={<FaGlobeAsia />} />
                <Text color={colors.secondary_dark}>
                  Nationality : {state.nationality}
                </Text>
              </div>
              <div className="basic-info-item">
                <Icons icon={<FaPhoneAlt />} />
                <Text color={colors.secondary_dark}>
                  Phone number : {state.phoneNumber}
                </Text>
              </div>
              <div className="basic-info-item">
                <Icons icon={<FaRegCalendarAlt />} />
                <Text color={colors.secondary_dark}>
                  Last active : {"8-31-2023"}
                </Text>
              </div>
            </div>
            <div className="reward-card">
              <div>
                <div className="reward-card-title">
                  <img src={imageList.AwardIcon} />
                  <Text color={colors.secondary_dark}>Reward Points</Text>
                </div>
                <Text textAlign={"center"} fontSize={"2xl"}>
                  {rewardPoints ?? ""}
                </Text>
              </div>
            </div>
          </div>
        </Card>
        <HistoryCard>
          <MemberHistory data={historyData} />
        </HistoryCard>
        <ModalForm
          isModalOpen={isProfileOpen}
          onCloseModal={onProfileModalClose}
          showFooter={false}
        >
          <ProfileForm
            userId={state}
            handleFormSubmit={() => handleFormSubmit(data)}
            onCloseModal={onProfileModalClose}
          />
        </ModalForm>
      </Wrapper>
    </>
  );
};
export default MemberProfile;
