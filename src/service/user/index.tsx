import { useMutation, useQueryClient } from "react-query";
import { api } from "../api";
import { HttpClient } from "../config/api";
import { toastFail, toastSuccess } from "../service-toast";
import { AxiosError } from "axios";

export const getUserDetail = () => {
  return HttpClient.get(api.user.fetch);
};

export const updateUserDetail = ({ id, data }: { id: string; data: any }) => {
  return HttpClient.post(api.user.update.replace(":id", id), data);
};

export const useUpdateUserDetail = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserDetail, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.refetchQueries("user_detail");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
};
