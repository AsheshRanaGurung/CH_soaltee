import { imageList } from "@src/assets/images";
import styled from "styled-components";
import { Text } from "@chakra-ui/layout";
import { colors } from "@src/theme/colors";
import Icons from "@src/components/atoms/Icons";
import { AiFillMail, AiOutlinePlus } from "react-icons/ai";
import { FaGlobeAsia, FaPhoneAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "@chakra-ui/button";
import { useLocation } from "react-router";

const Wrapper = styled.div`
  position: relative;
  .profile-img {
    position: absolute;
    top: -75px;
    left: 51px;
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
const MemberProfile = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <Wrapper>
      <img className="profile-img" src={imageList.profileAvatar} />
      <Card>
        <div className="profile-card">
          <div>
            <Text fontSize={"3xl"}>Sita Kumari</Text>
            <Text>Gold Tier Member</Text>
          </div>
          <div>
            <Button
              type="submit"
              className="button"
              w="100%"
              borderRadius="5px"
              leftIcon={<AiOutlinePlus />}
            >
              Add Points
            </Button>
          </div>
        </div>
        <div className="detail-card">
          <div className="basic-info">
            <div className="basic-info-item">
              <Icons icon={<AiFillMail />} />
              <Text color={colors.secondary_dark}>Email:{state.email}</Text>
            </div>
            <div className="basic-info-item">
              <Icons icon={<FaGlobeAsia />} />
              <Text color={colors.secondary_dark}>
                Nationality:{state.nationality}
              </Text>
            </div>
            <div className="basic-info-item">
              <Icons icon={<FaPhoneAlt />} />
              <Text color={colors.secondary_dark}>
                Phone number:{state.phoneNumber}
              </Text>
            </div>
            <div className="basic-info-item">
              <Icons icon={<FaRegCalendarAlt />} />
              <Text color={colors.secondary_dark}>
                Last active:{"8-31-2023"}
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
                3200
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};
export default MemberProfile;
