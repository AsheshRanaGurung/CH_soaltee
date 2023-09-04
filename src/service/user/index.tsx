import { api } from "../api";
import { HttpClient } from "../config/api";

export const getUserDetail = () => {
  return HttpClient.get(api.user.fetch);
};
