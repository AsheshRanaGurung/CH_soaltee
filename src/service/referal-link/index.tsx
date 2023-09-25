import { api } from "../api";
import { HttpClient } from "../config/api";

export const getReferalLink = () => {
  return HttpClient.get(api.referal_link);
};
