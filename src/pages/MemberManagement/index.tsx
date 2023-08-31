import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import MemberManagementList from "@soaltee-loyalty/components/templates/member-management";
import { getAllMembers } from "@soaltee-loyalty/service/member-management";
import { useQuery } from "react-query";

const MemberManagementPage = () => {
  const { data, isLoading } = useQuery("member_management", getAllMembers, {
    select: ({ data }) => data.data,
  });
  return (
    <>
      <BreadCrumb name="Master Data" />
      <Content>
        <MemberManagementList data={data} isLoading={isLoading} />
      </Content>
    </>
  );
};

export default MemberManagementPage;
