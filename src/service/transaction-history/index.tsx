import { api } from "../api";
import { HttpClient } from "../config/api";

export const getTransactionHistory = (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const type = pageParams.queryKey[1]?.type || "";
  const propertyId = pageParams.queryKey[1]?.propertyId || "";
  const dates = pageParams.queryKey[1]?.dates || "";

  return HttpClient.get(
    api.transcaction_history.replace(
      `pageIndex={page}&pageSize={limit}&type={type}&propertyId={propertyId}&dates={dates}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&type=${type}&propertyId=${propertyId}&dates=${dates}`
    )
  );
};
