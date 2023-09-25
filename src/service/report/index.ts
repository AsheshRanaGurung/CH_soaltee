import { api } from "@src/service/api";
import { HttpClient } from "@src/service/config/api";

export const getAllReport = async (pageParams: any) => {
  const pageIndex = pageParams.queryKey[1]?.page;
  const pageSize = pageParams.queryKey[1]?.limit;
  const tier = pageParams.queryKey[1]?.tier || "";
  const property = pageParams.queryKey[1]?.property || "";
  const nationality = pageParams.queryKey[1]?.nationality || "";
  const totalAmount = pageParams.queryKey[1]?.totalAmount || "";
  const fromDate = pageParams.queryKey[1]?.fromDate || "";
  const toDate = pageParams.queryKey[1]?.toDate || "";
  return await HttpClient.get(
    api.report.fetch.replace(
      `pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&tier=${tier}&property=${property}&nationality=${nationality}&totalAmount=${totalAmount}&fromDate=${fromDate}&toDate=${toDate}`
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
  const fromDate = pageParams.queryKey[1]?.fromDate || "";
  const toDate = pageParams.queryKey[1]?.toDate || "";
  return await HttpClient.get(
    api.report.fetch_earning.replace(
      `pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&tier=${tier}&property=${property}&nationality=${nationality}&totalAmount=${totalAmount}&fromDate=${fromDate}&toDate=${toDate}`
    )
  );
};

export const exportUserReport = async (pageParams: any) => {
  const pageIndex = pageParams?.page;
  const pageSize = pageParams?.limit;
  const tier = pageParams?.tier || "";
  const property = pageParams?.property || "";
  const nationality = pageParams?.nationality || "";
  const totalAmount = pageParams?.totalAmount || "";
  const fromDate = pageParams?.fromDate || "";
  const toDate = pageParams?.toDate || "";

  const response = await HttpClient.get(
    api.report.export_user.replace(
      `pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&tier=${tier}&property=${property}&nationality=${nationality}&totalAmount=${totalAmount}&fromDate=${fromDate}&toDate=${toDate}`
    )
  );
  return response;
};

export const exportEarningReport = async (pageParams: any) => {
  const pageIndex = pageParams?.page;
  const pageSize = pageParams?.limit;
  const tier = pageParams?.tier || "";
  const property = pageParams?.property || "";
  const nationality = pageParams?.nationality || "";
  const totalAmount = pageParams?.totalAmount || "";
  const fromDate = pageParams?.fromDate || "";
  const toDate = pageParams?.toDate || "";

  const response = await HttpClient.get(
    api.report.export_earning.replace(
      `pageIndex={page}&pageSize={limit}&tier={tier}&property={property}&nationality={nationality}&totalAmount={totalAmount}&fromDate={fromDate}&toDate={toDate}`,
      `pageIndex=${pageIndex}&pageSize=${pageSize}&tier=${tier}&property=${property}&nationality=${nationality}&totalAmount=${totalAmount}&fromDate=${fromDate}&toDate=${toDate}`
    )
  );
  return response;
};
