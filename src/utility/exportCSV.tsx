export const exportToCSV = ({ data, fileName }: any) => {
  const blob = new Blob([data], {
    type: "application/octet-stream",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
};
