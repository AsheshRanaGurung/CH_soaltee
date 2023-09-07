import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const getAllVoucher = () => {
  return HttpClient.get(api.voucher.fetch);
};

const createVoucher = (data: any) => {
  return HttpClient.post(`${api.voucher.add}`, data);
};

export const useCreateVoucher = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  return useMutation(createVoucher, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("voucher");
      toastSuccess(response?.data?.message);

      navigate(NAVIGATION_ROUTES.VOUCHER);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(
        error.response?.data?.message ||
          "Cound not create voucher at this moment"
      );
    },
  });
};

const updateVoucher = ({ id, data }: { id: string; data: any }) => {
  return HttpClient.post(api.voucher.update.replace(":id", id), data);
};

export const useUpdateVoucher = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(updateVoucher, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.invalidateQueries("voucher");
      navigate(NAVIGATION_ROUTES.VOUCHER);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
};

const deleteVoucher = ({ id }: any) => {
  return HttpClient.delete(api.voucher.delete.replace(":id", id));
};
export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteVoucher, {
    onSuccess: () => {
      toastSuccess("Voucher deleted successfuly");
      queryClient.refetchQueries("voucher");
    },
  });
};
