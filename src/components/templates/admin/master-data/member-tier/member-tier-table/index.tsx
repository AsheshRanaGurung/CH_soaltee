import { Stack } from "@chakra-ui/react";
import DataTable from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { IMemberTierDetail } from "@src/interface/master-data/property";
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
  paginatedData: IMemberTierDetail[];
  pageParams: IParams;
}

const MemberTierTable: React.FC<IMemberTierTable> = ({
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
        accessor: (_: IMemberTierDetail, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Tier Name",
        accessor: "membershipName",
        width: "20%",
      },
      {
        Header: "Points From Tier",
        accessor: "pointsFrom",
        width: "20%",
      },
      {
        Header: "Points To Tier",
        accessor: "pointsTo",
        width: "20%",
      },
      {
        Header: "Image",
        accessor: "imageUrl",
        width: "20%",
        Cell: ({ value }: { value: string }) => {
          return <img src={value} alt="Image" width="100" />;
        },
      },

      {
        Header: "Action",
        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
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
    </>
  );
};

export default MemberTierTable;
