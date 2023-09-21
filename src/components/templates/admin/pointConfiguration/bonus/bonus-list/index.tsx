import { Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { usePageParams } from "@src/components/organisms/layout";
import { CellProps } from "react-table";
import TableActions from "@src/components/molecules/table/TableActions";
import TableHeadings from "@src/components/molecules/table-heading";
import BasicTable from "@src/components/molecules/table";
interface IBonusProps {
  setUpdateId: any;
  setIsUpdate: any;
  onBonusModalOpen: any;
  onCloseHandler: any;
  data: any;
  isLoading: any;
  onDeleteBonusOpen: any;
  onDeleteBonus: any;
  setDeleteId: any;
}

const BonusList: React.FC<IBonusProps> = ({
  setUpdateId,
  setIsUpdate,
  onBonusModalOpen,
  onCloseHandler,
  data,
  isLoading,
  onDeleteBonusOpen,
  setDeleteId,
}) => {
  const { pageParams } = usePageParams();
  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },
      {
        header: "Bonus Name",
        accessorKey: "bonusName",
        width: "20%",
      },
      {
        header: "Valid from",
        accessorKey: "validFrom",
        width: "20%",
      },
      {
        header: "Valid to",
        accessorKey: "validTo",
        width: "20%",
      },
      {
        header: "Bonus Value",
        accessorKey: "bonusValue",
        width: "20%",
      },
      {
        header: "Service Name",
        accessorKey: "serviceName",
        width: "20%",
      },
      {
        header: "Action",
        width: "10%",

        cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original.id);
            setIsUpdate(true);
            onBonusModalOpen();
          };
          const onDelete = () => {
            setDeleteId(row.original.id);
            onDeleteBonusOpen();
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
      <TableHeadings
        btnText="Add Bonus"
        CurrentText="Bonus List"
        onAction={() => {
          onCloseHandler();
          onBonusModalOpen();
        }}
      />
      <BasicTable
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
        totalPages={data?.totalPages}
      />
    </>
  );
};
export default BonusList;
