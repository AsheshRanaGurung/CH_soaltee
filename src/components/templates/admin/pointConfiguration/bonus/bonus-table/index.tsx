import { Stack } from "@chakra-ui/react";
import DataTable from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { IParams } from "@src/interface/params";
import { IBonus } from "@src/interface/pointConfig";
import { useMemo } from "react";
import { CellProps } from "react-table";

interface IBonusProps {
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onEditData?: ((id: string) => void) | undefined;
  onDeleteData?: ((id: string) => void) | undefined;
  paginatedData: IBonus[];
  pageParams: IParams;
}

const BonusTable: React.FC<IBonusProps> = ({
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
        accessor: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Bonus Name",
        accessor: "bonusName",
        width: "20%",
      },
      {
        Header: "Valid from",
        accessor: "validFrom",
        width: "20%",
      },
      {
        Header: "Valid to",
        accessor: "validTo",
        width: "20%",
      },
      {
        Header: "Bonus Value",
        accessor: "bonusValue",
        width: "20%",
      },
      {
        Header: "Service Name",
        accessor: "serviceName",
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
export default BonusTable;
