import { api } from "../api";
import { HttpClient } from "../config/api";

export const getTopReward = () => {
  return HttpClient.get(api.dashboard.fetch);
};
