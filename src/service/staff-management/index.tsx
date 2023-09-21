import { api } from "../api";
import { HttpClient } from "../config/api";

export const getAllStaff = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  return HttpClient.get(
    api.staff_management.fetch.replace(
      `pageIndex={page}&pageSize={limit}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}`
    )
  );
  // return HttpClient.get(api.staff_management.fetch);
};
