import { Stack } from "@chakra-ui/react";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { IProperty } from "@src/interface/master-data/property";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";

interface IMemberTierTable {
  tableData?: IProperty[];
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onMemberModalOpen?: () => void;
  onEditData?: ((id: string) => void) | undefined;
  onDeleteData?: ((id: string) => void) | undefined;
}

const PropertyTable: React.FC<IMemberTierTable> = ({
  tableData,
  tableDataFetching,
  onAction,
  title,
  btnText,
  CurrentText,
  onEditData,
  onDeleteData,
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
        accessor: (_: IProperty, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Property Name",
        accessor: "name",
        width: "20%",
      },
      {
        Header: "Property Code",
        accessor: "code",
        width: "20%",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        width: "20%",
      },
      {
        Header: "Contact person",
        accessor: "contactPerson",
        width: "20%",
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            onEditData && onEditData(row.original?.id);
          };
          const onDelete = () => {
            onDeleteData && onDeleteData(row.original?.id);
          };
          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} onDelete={onDelete} />
            </Stack>
          );
        },
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
export default PropertyTable;
