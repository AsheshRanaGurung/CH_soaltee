import { api } from "../api";
import { HttpClient } from "../config/api";

export const getAllStaff = () => {
  return HttpClient.get(api.staff_management.fetch);
};
