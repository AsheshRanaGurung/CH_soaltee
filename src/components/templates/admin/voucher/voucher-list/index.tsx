import { useFormHook } from "@src/hooks/useFormhook";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useNavigate } from "react-router-dom";
import TableHeadings from "@src/components/molecules/table-heading";
import BasicTable from "@src/components/molecules/table";
import TableActions from "@src/components/molecules/table/TableActions";
import { Stack } from "@chakra-ui/react";
import { usePageParams } from "@src/components/organisms/layout";
import { CellProps } from "react-table";
import { IVoucher } from "@src/interface/voucher";
import { useMemo } from "react";
interface IVoucherList {
  tableData: any;
  tableDataFetching: boolean;
  onDeleteVoucherOpen: any;
  onDeleteVoucher: any;
  setDeleteId: any;
  setViewId: any;
  onViewVoucherOpen: any;
}

const defaultValues = {
  voucherName: "",
  service: "",
  discountPercentage: "",
  maximumAmounts: "",
  maximumLimits: "",
  description: "",
  voucherImage: "",
};

const VoucherList: React.FC<IVoucherList> = ({
  tableData,
  tableDataFetching,
  onDeleteVoucherOpen,
  onViewVoucherOpen,
  setDeleteId,
  setViewId,
}) => {
  const navigate = useNavigate();
  const { pageParams } = usePageParams();

  const { reset } = useFormHook({});

  const onCloseHandler = () => {
    reset(defaultValues);
    setDeleteId("");
  };
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
            setDeleteId(row.original.id);
            onDeleteVoucherOpen();
          };
          const onView = () => {
            setViewId(row.original.id);
            onViewVoucherOpen();
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
        onAction={() => {
          onCloseHandler();
          navigate(NAVIGATION_ROUTES.VOUCHER_ADD);
        }}
      />
      <BasicTable
        data={tableData?.data || []}
        columns={columns}
        isLoading={tableDataFetching}
        totalPages={tableData?.totalPages}
      />

      {/* <VoucherPage isOpen={isOpen} onClose={onClose} viewId={viewId} /> */}
    </>
  );
};
export default VoucherList;
