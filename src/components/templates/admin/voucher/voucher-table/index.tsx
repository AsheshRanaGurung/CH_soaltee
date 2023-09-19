import { Stack } from "@chakra-ui/react";
import BasicTable from "@src/components/molecules/table";
import TableHeadings from "@src/components/molecules/table-heading";
import TableActions from "@src/components/molecules/table/TableActions";
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
  onAction,
  onViewData,
  onDeleteData,
}) => {
  const navigate = useNavigate();
  const [pageParams, _] = useState({
    page: 1,
    limit: 10,
  });

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: IVoucher, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
      },

      {
        header: "Voucher Name",
        accessorKey: "voucherName",
      },
      {
        header: "Service",
        accessorKey: "serviceCategory.serviceName",
      },
      {
        header: "Discount Percentage",
        accessorKey: "discountPercentage",
      },
      {
        header: "Maximum Amount",
        accessorKey: "maximumAmounts",
      },
      {
        header: "Maximum limit",
        accessorKey: "maximumLimits",
      },

      {
        header: "Action",
        cell: ({ row }: CellProps<{ id: string; name: string }>) => {
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
      <TableHeadings
        btnText="Add Voucher"
        CurrentText="Voucher List"
        onAction={onAction}
      />
      <BasicTable data={tableData || []} columns={columns} count={20} />
    </>
  );
};

export default VoucherTable;
