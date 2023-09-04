import { IService } from "@src/interface/pointConfig";
import { HttpClient } from "../../config/api";
import { api } from "../../api";
import { useMutation, useQueryClient } from "react-query";
import { toastFail, toastSuccess } from "../../service-toast";
import { AxiosError } from "axios";

export const imageApi = async (url: any) => {
  const response = await HttpClient.get(`${url.value}`, {
    responseType: "blob",
  });
  return response;
};

export const createServiceApi = (data: IService) => {
  return HttpClient.post(`${api.configuration.service.add}`, {
    data: data,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation(createServiceApi, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("service");
      toastSuccess(response?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(
        error.response?.data?.message || "Cound not create member tier"
      );
    },
  });
};

export const getAllService = () => {
  return HttpClient.get(api.configuration.service.fetch);
};

//update service
export const updateService = ({ id, data }: { id: string; data: IService }) => {
  return HttpClient.post(api.configuration.service.update.replace(":id", id), {
    data: {
      ...data,
    },
  });
};
export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation(updateService, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.invalidateQueries("service");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
};
const deleteService = ({ id }: any) => {
  return HttpClient.delete(api.configuration.service.delete.replace(":id", id));
};
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteService, {
    onSuccess: () => {
      toastSuccess("Service deleted successfuly");
      queryClient.refetchQueries("service");
    },
  });
};
