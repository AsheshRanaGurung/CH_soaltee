import { ICreateManually } from "@src/interface/profile-points";
import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";

//create member management
export const createManual = (data: ICreateManually) => {
  return HttpClient.post(`${api.profile.manual.add}`, {
    data: data,
  });
};
