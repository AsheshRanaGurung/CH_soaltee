import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastSuccess } from "@src/service/service-toast";
import { useQueryClient, useMutation } from "react-query";

//member tier
export const getAllMemberTier = () => {
  return HttpClient.get(api.master_data.member_tier.fetch);
};

//delete member tier
export const deleteMemberTier = ({ id }: any) => {
  return HttpClient.delete(
    api.master_data.member_tier.delete.replace(":id", id)
  );
};
const useDeleteMemberTier = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMemberTier, {
    onSuccess: () => {
      toastSuccess("Member Tier deleted successfuly");
      queryClient.refetchQueries("member_tier");
    },
  });
};

export { useDeleteMemberTier };
