import { AxiosError } from "axios";
import { api } from "../api";
import { HttpClient } from "../config/api";
import { useQuery } from "react-query";

const getTopReward = (duration: string) => () => {
  return HttpClient.get(`${api.dashboard.fetch}${duration}`);
};

const useGetTopReward = (duration: string) => {
  return useQuery(
    [`${api.dashboard.fetch}${duration}`],
    getTopReward(duration),
    {
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
};
export const getTopRewardUsers = () => {
  return HttpClient.get(api.dashboard.fetchreward);
};

// totalReward
const getTotalReward = (duration: string) => () => {
  return HttpClient.get(`${api.dashboard.fetchTotal}${duration}`);
};

const useGetTotalReward = (duration: string) => {
  return useQuery(
    [`${api.dashboard.fetchTotal}${duration}`],
    getTotalReward(duration),
    {
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
};

export { useGetTopReward, useGetTotalReward };
