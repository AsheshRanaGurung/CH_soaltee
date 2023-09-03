import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import MemberList from "@src/components/templates/master-data/member-list";
import { getAllMemberTier } from "@src/service/master-data/member-tier";
import { useQuery } from "react-query";

const MemberPage = () => {
  const { data, isLoading } = useQuery("member_tier", getAllMemberTier, {
    select: ({ data }) => data.datalist,
  });
  return (
    <>
      <BreadCrumb name="Master Data" />
      <Content>
        <MemberList data={data} isLoading={isLoading} />
      </Content>
    </>
  );
};

export default MemberPage;
