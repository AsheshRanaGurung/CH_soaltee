import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import MemberList from "@soaltee-loyalty/components/templates/master-data/member-list";
import { getAllMemberTier } from "@soaltee-loyalty/service/master-data/member-tier";
import { useQuery } from "react-query";

const MemberPage = () => {
  const { data, isLoading } = useQuery("member", getAllMemberTier, {
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
