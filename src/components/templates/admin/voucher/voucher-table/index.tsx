import { Stack } from "@chakra-ui/react";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { IVoucher } from "@src/interface/voucher";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CellProps } from "react-table";

interface IVoucherTable {
  tableData?: IVoucher[];
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onMemberModalOpen?: () => void;
  onEditData?: ((id: string) => void) | undefined;
  onViewData?: ((id: string) => void) | undefined;

  onDeleteData?: ((id: string) => void) | undefined;
}

const VoucherTable: React.FC<IVoucherTable> = ({
  tableData,
  tableDataFetching,
  onAction,
  onViewData,
  title,
  btnText,
  CurrentText,
  onDeleteData,
}) => {
  const navigate = useNavigate();
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });
  const paginatedData = getPaginatedData({
    tableData,
    pageParams,
  });
  const _pageChange = (page: number) => {
    setPageParams({ ...pageParams, page });
  };
  const _pageSizeChange = (limit: number) =>
    setPageParams({ ...pageParams, limit, page: 1 });

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (_: IVoucher, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Voucher Name",
        accessor: "voucherName",
        width: "20%",
      },
      {
        Header: "Service",
        accessor: "service",
        width: "20%",
      },
      {
        Header: "Discount Percentage",
        accessor: "discountPercentage",
        width: "20%",
      },
      {
        Header: "Maximum Amount",
        accessor: "maximumAmounts",
        width: "20%",
      },
      {
        Header: "Maximum limit",
        accessor: "maximumLimits",
        width: "20%",
      },

      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            navigate(NAVIGATION_ROUTES.VOUCHER_ADD, {
              state: row.original,
            });
          };
          const onDelete = () => {
            onDeleteData && onDeleteData(row.original?.id);
          };
          const onView = () => {
            onViewData && onViewData(row.original?.id);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            </Stack>
          );
        },
        width: 120,
      },
    ],
    [pageParams]
  );

  return (
    <>
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        CurrentText={CurrentText}
        btnText={btnText}
        onAction={onAction}
        title={title}
      ></DataTable>

      <Pagination
        enabled={true}
        queryPageIndex={pageParams.page}
        queryPageSize={pageParams.limit}
        totalCount={tableData?.length || 0}
        pageChange={_pageChange}
        pageSizeChange={_pageSizeChange}
      />
    </>
  );
};

export default VoucherTable;
