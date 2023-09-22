import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";
import { toastFail, toastSuccess } from "@src/service/service-toast";
import { AxiosError } from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export const getAllOffer = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const name = pageParams.queryKey[1]?.name;
  return HttpClient.get(
    api.offer.fetch.replace(
      `pageIndex={page}&pageSize={limit}&name={name}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&name=${name}`
    )
  );
};

export const createOffer = (data: any) => {
  return HttpClient.post(`${api.offer.add}`, data);
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  return useMutation(createOffer, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("offer");
      toastSuccess(response?.data?.message);

      navigate(NAVIGATION_ROUTES.OFFER);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(
        error.response?.data?.message || "Cound not create offer at this moment"
      );
    },
  });
};

const updateOffer = ({ id, data }: { id: string; data: any }) => {
  return HttpClient.post(api.offer.update.replace(":id", id), data);
};

export const useUpdateOffer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(updateOffer, {
    onSuccess: (response) => {
      toastSuccess(response?.data?.message);
      queryClient.invalidateQueries("offer");
      navigate(NAVIGATION_ROUTES.OFFER);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || "Something went wrong");
    },
  });
};

const deleteOffer = ({ id }: any) => {
  return HttpClient.delete(api.offer.delete.replace(":id", id));
};
export const useDeleteOffer = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOffer, {
    onSuccess: () => {
      toastSuccess("Offer deleted successfuly");
      queryClient.refetchQueries("offer");
    },
  });
};

const getAllOfferId = (id: string) => () => {
  return HttpClient.get(`${api.offer.fetchID}/${id}`);
};

const useGetAllOfferId = (id: string) => {
  return useQuery([`${api.offer.fetchID}/${id}`], getAllOfferId(id), {
    enabled: !!id,
    select: (data: { data: { data: any } }) => data?.data?.data || {},
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });
};

export { useGetAllOfferId };
