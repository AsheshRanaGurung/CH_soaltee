export const exportToCSV = ({ data }: any) => {
  // const blob = new Blob([data], {
  //   type: "application/octet-stream",
  // });

  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // a.style.display = "none";
  // a.href = url;
  // a.download = `${fileName}.xlsx`;
  // document.body.appendChild(a);
  // a.click();
  // URL.revokeObjectURL(url);
  const excelDataUri = `http://172.30.1.9:8050/excel/overall-report?pageIndex=${
    data?.page
  }&pageSize=${data.limit}&tier=${data?.tier || ""}&property=${
    data?.property || ""
  }&nationality=${data?.nationality}&totalAmount=${
    data?.totalAmount
  }&fromDate=${data?.fromDate}&toDate=${data?.toDate}`;
  const newTab = window.open(excelDataUri, "_blank");
  setTimeout(() => {
    newTab?.close();
  }, 5000);
};
