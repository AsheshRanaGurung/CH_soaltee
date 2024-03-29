import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import MemberProfile from "@src/components/templates/admin/member-management/member-profile";

const ProfileDetail = () => {
  return (
    <>
      <BreadCrumb name="Member Management" />
      <Content>
        <MemberProfile />
      </Content>
    </>
  );
};
export default ProfileDetail;
