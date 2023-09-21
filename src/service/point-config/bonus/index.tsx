import { IBonus } from "@src/interface/pointConfig";
import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastSuccess } from "@src/service/service-toast";
import { useQueryClient, useMutation } from "react-query";

export const getAllBonus = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  return HttpClient.get(
    api.configuration.bonus.fetch.replace(
      `pageIndex={page}&pageSize={limit}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  );
  // return HttpClient.get(api.configuration.bonus.fetch);
};

export const createBonus = (data: IBonus) => {
  return HttpClient.post(`${api.configuration.bonus.add}`, {
    data: data,
  });
};

export const updateBonus = ({ id, data }: { id: string; data: IBonus }) => {
  return HttpClient.post(api.configuration.bonus.update.replace(":id", id), {
    data: {
      id,
      ...data,
    },
  });
};

export const deleteBonus = ({ id }: any) => {
  return HttpClient.delete(api.configuration.bonus.delete.replace(":id", id));
};
export const useDeleteBonus = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBonus, {
    onSuccess: () => {
      toastSuccess("Bonus deleted successfuly");
      queryClient.refetchQueries("bonus");
    },
  });
};
