import { Stack } from "@chakra-ui/react";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";

interface IMemberTierTable {
  tableData?: any;
  tableDataFetching?: boolean;
  onAction?: any;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onMemberModalOpen?: any;
  onEditt?: any;
  onDeletee?: any;
}

const MemberTierTable: React.FC<IMemberTierTable> = ({
  tableData,
  tableDataFetching,
  onAction,
  title,
  btnText,
  CurrentText,
  onEditt,
  onDeletee,
}) => {
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
        accessor: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Tier Name",
        accessor: "membershipName",
        width: "20%",
      },
      {
        Header: "Points To Tier",
        accessor: "requiredPoints",
        width: "40%",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
        width: "20%",
        Cell: ({ value }: any) => {
          return <img src={value} alt="Image" width="100" />;
        },
      },

      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            onEditt(row.original?.id);
          };
          const onDelete = () => {
            onDeletee(row.original?.id);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} onDelete={onDelete} />
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

export default MemberTierTable;
