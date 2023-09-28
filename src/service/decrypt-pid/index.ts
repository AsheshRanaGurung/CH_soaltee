import { api } from "../api";
import { HttpClient } from "../config/api";

export const decryptPid = (data: any) => {
  return HttpClient.post(api.decrypt_pid.replace("{value}", data));
};
