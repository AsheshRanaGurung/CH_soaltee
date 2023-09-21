import { Stack } from "@chakra-ui/react";
import { CellProps } from "react-table";
import TableActions from "@src/components/molecules/table/TableActions";
import TableHeadings from "@src/components/molecules/table-heading";
import BasicTable from "@src/components/molecules/table";
import { usePageParams } from "@src/components/organisms/layout";
import { useMemo } from "react";

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
  onCloseHandler,
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
      <TableHeadings
        btnText="Add Staff"
        CurrentText="Staff List"
        onAction={() => {
          onCloseHandler();
          onStaffManagementModalOpen();
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
export default StaffManagementList;
