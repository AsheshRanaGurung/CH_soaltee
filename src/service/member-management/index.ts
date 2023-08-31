import { api } from "../api";
import { HttpClient } from "../config/api";
// import axios from "axios";

//get all member management
export const getAllMembers = () => {
  return HttpClient.get(api.member_management.fetch);
};

//create member management
// const createMember = ({ data }: any) => {
//   console.log(data);
//   return HttpClient.post(api.member_management.add, data);
// };
export const useCreateMember = (data: any) => {
  return HttpClient.post(`${api.member_management.add}`, {
    data: data,
  });
};

// const useCreateMember = () => {
//   const queryClient = useQueryClient();
//   return useMutation(createMember, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["member_management"]);
//       toastSuccess("Member created successfully");
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       toastFail(error.response?.data?.message || "Couldnot createMember");
//     },
//   });
// };
// export { useCreateMember };
