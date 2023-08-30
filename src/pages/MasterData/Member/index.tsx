import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import MemberList from "@soaltee-loyalty/components/templates/master-data/member-list";
import { api } from "@soaltee-loyalty/service/api";
import { getAllMemberTier } from "@soaltee-loyalty/service/master-data";
import { useQuery } from "react-query";

const MemberPage = () => {
  const { data, isLoading } = useQuery(
    api.master_data.member_tier.fetch,
    getAllMemberTier,
    {
      select: ({ data }) => data.datalist,
    }
  );
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
