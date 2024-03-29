import { Stack } from "@chakra-ui/react";
import { CellProps } from "react-table";
import TableActions from "@src/components/molecules/table/TableActions";
import BasicTable from "@src/components/molecules/table";
import { usePageParams } from "@src/components/organisms/layout";
import { useMemo } from "react";
import Switch from "@src/components/atoms/Switch";

interface IMemberProps {
  setUpdateId: any;
  setIsUpdate: any;
  onStaffManagementModalOpen: any;
  onCloseHandler: any;
  data: any;
  isLoading: any;
}

const StaffManagementList: React.FC<IMemberProps> = ({
  setUpdateId,
  setIsUpdate,
  onStaffManagementModalOpen,
  data,
  isLoading,
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
        header: "Full Name",
        accessorKey: "fullName",
        width: "20%",
      },
      {
        header: "Email",
        accessorKey: "email",
        width: "10%",
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
        width: "20%",
      },
      {
        header: "Nationality",
        accessorKey: "nationality",
        width: "10%",
      },
      {
        header: "Is Blocked?",
        accessorKey: "isBlocked",
        cell: ({ row }: CellProps<{ isBlocked: boolean }>) => {
          const status = row?.original?.isBlocked;
          return status === true ? (
            <Switch value={true} variant="red" />
          ) : (
            <Switch disabled />
          );
        },
      },

      {
        header: "Action",
        width: "10%",

        cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original.id);
            setIsUpdate(true);
            onStaffManagementModalOpen();
          };

          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} />
            </Stack>
          );
        },
      },
    ],
    [pageParams]
  );

  return (
    <>
      <BasicTable
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
        totalPages={data?.totalPages}
      />
    </>
  );
};
export default StaffManagementList;
