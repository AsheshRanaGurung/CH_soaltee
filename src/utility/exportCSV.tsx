import { baseURL } from "@src/service/config/api";

export const exportToCSV = async ({ data, path }: any) => {
  const excelDataUri = `${baseURL}excel/${path}?pageIndex=${
    data?.page
  }&pageSize=${data?.limit}&tier=${data?.tier || ""}&property=${
    data?.property || ""
  }&nationality=${data?.nationality || ""}&totalAmount=${
    data?.totalAmount
  }&fromDate=${data?.fromDate || ""}&toDate=${data?.toDate || ""}`;
  const newTab = window.open(excelDataUri, "_blank");
  setTimeout(() => {
    newTab?.close();
  }, 500);
};
