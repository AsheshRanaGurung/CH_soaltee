// import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
// import Content from "@src/components/molecules/content";
// import ReportList from "@src/components/templates/admin/report/report-list";
// import { getAllReport } from "@src/service/Report";

// import { useQuery } from "react-query";

// const ReportPage = () => {
//   const { data, isLoading } = useQuery("Report", getAllReport, {
//     select: ({ data }) => data,
//   });

//   return (
//     <>
//       <BreadCrumb name="Report" />
//       <Content>
//         <ReportList tableData={data?.data} tableDataFetching={isLoading} />
//       </Content>
//     </>
//   );
// };

// export default ReportPage;
// import { DateTime } from 'luxon'
import { useMemo } from "react";
import movies from "./MOVIE_DATA.json";
import BasicTable from "@src/components/molecules/table";

function ReportPage() {
  const data = useMemo(() => movies, []);

  const movieColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Genre",
      accessorKey: "genre",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
  ];

  return (
    <>
      <BasicTable data={data} columns={movieColumns} count={200} />
    </>
  );
}

export default ReportPage;
