import { Stack } from "@chakra-ui/react";
import DataTable from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { IProperty } from "@src/interface/master-data/property";
import { IParams } from "@src/interface/params";
import { useMemo } from "react";
import { CellProps } from "react-table";

interface IMemberTierTable {
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onEditData?: ((id: string) => void) | undefined;
  onDeleteData?: ((id: string) => void) | undefined;
  paginatedData: IProperty[];
  pageParams: IParams;
}

const PropertyTable: React.FC<IMemberTierTable> = ({
  tableDataFetching,
  onAction,
  title,
  btnText,
  CurrentText,
  onEditData,
  onDeleteData,
  paginatedData,
  pageParams,
}) => {
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
    </>
  );
};
export default PropertyTable;
