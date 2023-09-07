import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";

export const getAllReport = () => {
  return HttpClient.get(api.report.fetch);
};
