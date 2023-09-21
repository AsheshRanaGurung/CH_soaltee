import { useDisclosure } from "@chakra-ui/react";
import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import BasicTable from "@src/components/molecules/table";
import TableHeadings from "@src/components/molecules/table-heading";
import { usePageParams } from "@src/components/organisms/layout";
import UserFilter from "@src/components/templates/admin/report/user-filter";
import { usePageinationHook } from "@src/hooks/usePaginationHook";
import { exportUserReport, getAllReport } from "@src/service/report";
import { exportToCSV } from "@src/utility/exportCSV";
import moment from "moment";
import { useMemo, useState } from "react";

const UserReport = () => {
  const [para, setPara] = useState({});
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerModalOpen,
    onClose: onDrawerModalClose,
  } = useDisclosure();
  const { data, isLoading } = usePageinationHook({
    url: getAllReport,
    key: "report",
    extraParams: para,
    enabled: true,
  });

  const { pageParams } = usePageParams();
  const exportUserReports = async () => {
    const dataList = await exportUserReport({ ...pageParams, ...para });
    if (dataList && data && data.data.length > 0) {
      exportToCSV({ data: dataList.data, fileName: "user_report" });
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
        header: "Full Name",
        accessorKey: "fullName",
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
        header: "Nationality",
        accessorKey: "nationality",
      },
      {
        header: "Current Point",
        accessorKey: "currentPoints",
      },
      {
        header: "Top Point",
        accessorKey: "topPoints",
      },
      {
        header: "Last Active",
        accessorKey: "lastActive",
        cell: ({ row }: any) => {
          return moment(row.original.lastActive).format("YYYY-MM-DD");
        },
      },
      {
        header: "Current Tier",
        accessorKey: "membershipName",
      },
      {
        header: "Created By",
        accessorKey: "createdBy",
      },
      {
        header: "Created From",
        accessorKey: "propertyName",
      },

      {
        header: "Total Spend",
        accessorKey: "redeemPoints",
      },
    ],
    [pageParams]
  );
  return (
    <>
      <BreadCrumb name="Reports" subname="User Reports" />
      <Content>
        <TableHeadings
          type="report"
          CurrentText="User Reports"
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
export default UserReport;
