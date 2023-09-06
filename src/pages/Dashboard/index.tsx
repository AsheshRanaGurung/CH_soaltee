// import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import { DashboardAdmin } from "@src/components/molecules/Dashboard/Index";
import Content from "@src/components/molecules/content";
import { getTopReward } from "@src/service/dashboard";
import { useQuery } from "react-query";

const Dashboard = () => {
  const { data } = useQuery("top_reward", getTopReward, {
    select: ({ data }) => data,
  });
  return (
    <>
      <BreadCrumb name="Dashboard" />
      <Content>
        <DashboardAdmin data={data?.data} dataList={undefined} />
      </Content>
    </>
  );
};

export default Dashboard;
