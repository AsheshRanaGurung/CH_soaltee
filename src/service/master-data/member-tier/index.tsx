import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";

export const getAllMemberTier = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const name = pageParams.queryKey[1]?.name;
  return HttpClient.get(
    api.master_data.member_tier.fetch.replace(
      `pageIndex={page}&pageSize={limit}&name={name}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&name=${name}`
    )
  );
};

export const getAllMemberTierSelect = () => {
  return HttpClient.get(
    api.master_data.member_tier.fetch.replace(
      `pageIndex={page}&pageSize={limit}&name={name}`,
      `pageIndex=${1}&pageSize=${50}&name=`
    )
  );
};

const getMemberTierid = (id: string) => () => {
  return HttpClient.get(`${api.master_data.member_tier.fetchBYid}/${id}`);
};

const useGetMemberTierid = (id: string) => {
  return useQuery(
    [`${api.master_data.member_tier.fetchBYid}/${id}`],
    getMemberTierid(id),
    {
      enabled: !!id,
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
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

export { useDeleteMemberTier, useGetMemberTierid };
