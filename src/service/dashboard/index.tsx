import { api } from "../api";
import { HttpClient } from "../config/api";

export const getTopReward = () => {
  return HttpClient.get(api.dashboard.fetch);
};

export const getTopRewardUsers = () => {
  return HttpClient.get(api.dashboard.fetchreward);
};
