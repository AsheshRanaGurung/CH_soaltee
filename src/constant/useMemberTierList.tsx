import { getAllMemberTier } from "@src/service/master-data/member-tier";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useMemberTierList = () => {
  const [data, setData] = useState([]);
  const { data: memberData } = useQuery("member_tier", getAllMemberTier, {
    select: ({ data }) => data?.data,
  });

  useEffect(() => {
    setData(memberData);
  }, [memberData]);

  return data;
};
