import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import { DashboardAdmin } from "@src/components/templates/admin/dashboard";
import Content from "@src/components/molecules/content";
import {
  getTopRewardUsers,
  useGetTopReward,
  useGetTotalReward,
} from "@src/service/dashboard";
import { useState } from "react";
import { useQuery } from "react-query";

const Dashboard = () => {
  const [timeDuration, setTimeDuration] = useState("day");
  const [dateDuration, setDateDuration] = useState("week");

  const { data } = useGetTopReward(timeDuration);
  const { data: totalReward } = useGetTotalReward(dateDuration);

  const { data: rewardData } = useQuery("top_reward_users", getTopRewardUsers, {
    select: ({ data }) => data,
  });
  return (
    <>
      <BreadCrumb name="Dashboard" />
      <Content>
        <DashboardAdmin
          data={data}
          setTimeDuration={setTimeDuration}
          rewardData={rewardData?.data}
          totalReward={totalReward}
          setDateDuration={setDateDuration}
        />
      </Content>
    </>
  );
};

export default Dashboard;
