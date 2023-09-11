import { IMember } from "@src/interface/member-management";
import { api } from "../api";
import { HttpClient } from "../config/api";

export const getAllMembers = () => {
  return HttpClient.get(api.member_management.fetch);
};

//create member management
export const createMember = (data: IMember) => {
  return HttpClient.post(`${api.member_management.add}`, {
    data: data,
  });
};
// export const useCreateMember = () => {
//   const queryClient = useQueryClient();
//   return useMutation(createMember, {
//     onSuccess: (response) => {
//       queryClient.invalidateQueries("member_management");
//       toastSuccess(response?.data?.message);
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       toastFail(error.response?.data?.message || "Cound not create member");
//     },
//   });
// };
export const fetchOneMember = ({ id }: { id: string }) => {
  return HttpClient.get(api.member_management.fetchById.replace(":id", id));
};

export const getAllMemberHistory = () => {
  return HttpClient.get(api.member_management.get_history);
};
