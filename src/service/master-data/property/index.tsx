import { IProperty } from "@src/interface/master-data/property";
import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastSuccess } from "@src/service/service-toast";
import { useQueryClient, useMutation } from "react-query";

export const getAllProperty = () => {
  return HttpClient.get(api.master_data.property_list.fetch);
};

export const createProperty = (data: IProperty) => {
  return HttpClient.post(`${api.master_data.property_list.add}`, {
    data: data,
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
      queryClient.refetchQueries("property");
    },
  });
};

export { useDeleteProperty };
