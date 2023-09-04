import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useQueryClient, useMutation } from "react-query";

export const getAllMemberTier = () => {
  return HttpClient.get(api.master_data.member_tier.fetch);
};

export const createMemberTier = (data: any) => {
  return HttpClient.post(`${api.master_data.member_tier.add}`, data);
};

export const useCreateMemberTier = () => {
  const queryClient = useQueryClient();

  return useMutation(createMemberTier, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("member_tier");
      toastSuccess(response?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(
        error.response?.data?.message || "Cound not create member tier"
      );
    },
  });
};

export const updateMemberTier = ({ id, data }: { id: string; data: any }) => {
  return HttpClient.post(
    api.master_data.member_tier.update.replace(":id", id),
    data
  );
};

export const useUpdateMemberTier = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMemberTier, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.invalidateQueries("member_tier");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
};

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
