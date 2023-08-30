import { api } from "../api";
import { HttpClient } from "../config/api";
import { useQueryClient, useMutation } from "react-query";
import { toastSuccess } from "../service-toast";
// import axios from "axios";

//get all property tier
export const getAllProperty = () => {
  return HttpClient.get(api.master_data.property_list.fetch);
};

//delete property tier
export const deletePropertyTier = ({ id }: any) => {
  return HttpClient.delete(
    api.master_data.property_list.delete.replace(":id", id)
  );
};
const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePropertyTier, {
    onSuccess: () => {
      toastSuccess("Property Tier deleted successfuly");
      queryClient.invalidateQueries(api.master_data.property_list.fetch);
    },
  });
};

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
      queryClient.invalidateQueries(api.master_data.member_tier.fetch);
    },
  });
};

export { useDeleteProperty, useDeleteMemberTier };
