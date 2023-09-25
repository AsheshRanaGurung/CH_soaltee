import { api } from "../api";
import { HttpClient } from "../config/api";
export const sendEmail = (data: any) => {
  return HttpClient.post(`${api.send_email}`, {
    data: data,
  });
};
