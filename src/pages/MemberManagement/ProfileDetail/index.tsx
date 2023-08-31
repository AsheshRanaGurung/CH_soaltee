import { imageList } from "@soaltee-loyalty/assets/images";
import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import MemberProfile from "@soaltee-loyalty/components/templates/member-management/member-profile";

const ProfileDetail = () => {
  return (
    <>
      <BreadCrumb name="Member Management" />
      <Content>
        <img src={imageList.ProfileBanner} />
        <MemberProfile />
      </Content>
    </>
  );
};
export default ProfileDetail;
