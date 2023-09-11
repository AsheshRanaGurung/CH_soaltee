import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import ReportList from "@src/components/templates/admin/report/report-list";
import { getAllReport } from "@src/service/Report";

import { useQuery } from "react-query";

const ReportPage = () => {
  const { data, isLoading } = useQuery("Report", getAllReport, {
    select: ({ data }) => data,
  });

  return (
    <>
      <BreadCrumb name="Report" />
      <Content>
        <ReportList tableData={data?.data} tableDataFetching={isLoading} />
      </Content>
    </>
  );
};

export default ReportPage;
