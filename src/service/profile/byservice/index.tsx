import { ICreateByService } from "@src/interface/profile-points";
import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";

//create points by service
export const createByService = (data: ICreateByService) => {
  return HttpClient.post(`${api.profile.service.add}`, {
    data: data,
  });
};
