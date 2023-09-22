import { IProperty } from "@src/interface/master-data/property";
import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useQueryClient, useMutation } from "react-query";

export const getAllProperty = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const name = pageParams.queryKey[1]?.name;
  return HttpClient.get(
    api.master_data.property_list.fetch.replace(
      `pageIndex={page}&pageSize={limit}&name={name}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&name=${name}`
    )
  );
};
export const getAllPropertySelect = () => {
  return HttpClient.get(
    api.master_data.property_list.fetch.replace(
      `pageIndex={page}&pageSize={limit}&name={name}`,
      `pageIndex=${1}&pageSize=${50}&name=`
    )
  );
};

export const createProperty = (data: IProperty) => {
  return HttpClient.post(`${api.master_data.property_list.add}`, {
    data: data,
  });
};
export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(createProperty, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("property");
      toastSuccess(response?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(
        error.response?.data?.message || "Cound not create member tier"
      );
    },
  });
};
export const updateProperty = ({
  id,
  data,
}: {
  id: string;
  data: IProperty;
}) => {
  return HttpClient.post(
    api.master_data.property_list.update.replace(":id", id),
    {
      data: {
        id,
        ...data,
      },
    }
  );
};
export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProperty, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.invalidateQueries("property");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
};
export const deleteProperty = ({ id }: any) => {
  return HttpClient.delete(
    api.master_data.property_list.delete.replace(":id", id)
  );
};

const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProperty, {
    onSuccess: () => {
      toastSuccess("Property Tier deleted successfuly");
      queryClient.refetchQueries("property");
    },
  });
};

export { useDeleteProperty };
