import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";

export const getAllReport = async (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const tier = pageParams.queryKey[1]?.tier || "";
  const property = pageParams.queryKey[1]?.property || "";
  const nationality = pageParams.queryKey[1]?.nationality || "";
  const totalAmount = pageParams.queryKey[1]?.totalAmount || "";
  return await HttpClient.get(
    api.report.fetch.replace(
      `pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&tier=${tier}&property=${property}&nationality=${nationality}&totalAmount=${totalAmount}`
    )
  );
};

export const getAllEarningReport = async (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1].page;
  const pageSize = pageParams.queryKey[1].limit;
  const tier = pageParams.queryKey[1]?.tier || "";
  const property = pageParams.queryKey[1]?.property || "";
  const nationality = pageParams.queryKey[1]?.nationality || "";
  const totalAmount = pageParams.queryKey[1]?.totalAmount || "";
  return await HttpClient.get(
    api.report.fetch_earning.replace(
      `pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&tier=${tier}&property=${property}&nationality=${nationality}&totalAmount=${totalAmount}`
    )
  );
};
