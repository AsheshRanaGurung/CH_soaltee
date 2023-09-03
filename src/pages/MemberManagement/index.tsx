import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import MemberManagementList from "@src/components/templates/member-management";
import { getAllMembers } from "@src/service/member-management";
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
