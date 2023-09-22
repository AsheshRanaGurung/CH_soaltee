import { api } from "../api";
import { HttpClient } from "../config/api";

export const getAllStaff = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const name = pageParams.queryKey[1]?.name;
  return HttpClient.get(
    api.staff_management.fetch.replace(
      `pageIndex={page}&pageSize={limit}&name={name}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&name=${name}`
    )
  );
  // return HttpClient.get(api.staff_management.fetch);
};
