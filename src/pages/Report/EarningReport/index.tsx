import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import BasicTable from "@src/components/molecules/table";
import TableHeadings from "@src/components/molecules/table-heading";
import { usePageParams } from "@src/components/organisms/layout";
import UserFilter from "@src/components/templates/admin/report/user-filter";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { exportEarningReport, getAllEarningReport } from "@src/service/report";
import { exportToCSV } from "@src/utility/exportCSV";
import { useMemo, useState } from "react";

const EarningReport = () => {
  const [para, setPara] = useState({});
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerModalOpen,
    onClose: onDrawerModalClose,
  } = useDisclosure();
  const { data, isLoading } = usePageinationHook({
    url: getAllEarningReport,
    key: "earning_report",
    extraParams: para,
    enabled: true,
  });
  const { pageParams } = usePageParams();
  const exportUserReports = async () => {
    const dataList = await exportEarningReport({ ...pageParams, ...para });
    if (dataList && data && data.data.length > 0) {
      exportToCSV({ data: { ...pageParams, ...para } });
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
      },

      {
        header: "Property",
        accessorKey: "propertyName",
      },
      {
        header: "Service",
        accessorKey: "serviceName",
      },
      {
        header: "Type",
        accessorKey: "transactionType",
      },
      {
        header: "Member Name",
        accessorKey: "memberName",
      },

      {
        header: "Member Tier",
        accessorKey: "membershipTier",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
      },
      {
        header: "Earning Point",
        accessorKey: "earningPoints",
      },
      {
        header: "Total Bill",
        accessorKey: "totalBill",
      },
    ],
    [pageParams]
  );
  return (
    <>
      <BreadCrumb name="Reports" subname="Earning Reports" />
      <Content>
        <TableHeadings
          type="report"
          CurrentText="Earning Reports"
          drawerTitle="Report Filter"
          isDrawerOpen={isDrawerOpen}
          onDrawerModalOpen={onDrawerModalOpen}
          onDrawerModalClose={onDrawerModalClose}
          onClick={exportUserReports}
        >
          <UserFilter
            setPara={setPara}
            isLoading={isLoading}
            onDrawerModalClose={onDrawerModalClose}
          />
        </TableHeadings>
        <BasicTable
          data={data?.data || []}
          columns={columns}
          isLoading={isLoading}
          totalPages={data?.totalPages}
        />
      </Content>
    </>
  );
};
export default EarningReport;
