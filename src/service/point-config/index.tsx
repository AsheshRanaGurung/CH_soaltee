import { IService } from "@soaltee-loyalty/interface/pointConfig";
import { HttpClient } from "../config/api";
import { api } from "../api";
import { useMutation, useQueryClient } from "react-query";
import { toastSuccess } from "../service-toast";

export const createServiceApi = (data: IService) => {
  return HttpClient.post(`${api.configuration.service.add}`, {
    data: data,
  });
};

export const getAllService = () => {
  return HttpClient.get(api.configuration.service.fetch);
};

const deleteService = ({ id }: any) => {
  return HttpClient.delete(api.configuration.service.delete.replace(":id", id));
};
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteService, {
    onSuccess: () => {
      toastSuccess("Service deleted successfuly");
      queryClient.invalidateQueries(api.configuration.service.fetch);
    },
  });
};
