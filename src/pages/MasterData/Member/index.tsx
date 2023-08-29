import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import MemberList from "@soaltee-loyalty/components/templates/master-data/member-list";

const MemberPage = () => {
  return (
    <>
      <BreadCrumb name="Master Data" />
      <Content>
        <MemberList />
      </Content>
    </>
  );
};

export default MemberPage;
