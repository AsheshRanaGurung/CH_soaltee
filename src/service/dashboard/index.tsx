// import { useMutation, useQueryClient } from "react-query";
import { api } from "../api";
import { HttpClient } from "../config/api";
// import { toastFail, toastSuccess } from "../service-toast";
// import { AxiosError } from "axios";

export const getTopReward = () => {
  return HttpClient.get(api.dashboard.fetch);
};

export const getTopRewardUsers = () => {
  return HttpClient.get(api.dashboard.fetchreward);
};

// export const CreateTierPoint = (data) => {
//   return HttpClient.post(`${api.dashboard.add}`, data);
// };

// export const userCreateTierpoint = () => {
//   const queryClient = useQueryClient();
//   return useMutation(CreateTierPoint, {
//     onSuccess: (response) => {
//       queryClient.invalidateQueries("tier_point");
//       toastSuccess(response?.data?.message);
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       toastFail(error?.response?.data?.message) || "Something is Wrong";
//     },
//   });
// };

// export const updateTierPoint = (data, id) => {
//   return HttpClient.post(api.dashboard.update);
// };
