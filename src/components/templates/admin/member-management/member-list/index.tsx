import { Stack } from "@chakra-ui/react";
import Switch from "@src/components/atoms/Switch";
import BasicTable from "@src/components/molecules/table";
import TableHeadings from "@src/components/molecules/table-heading";
import TableActions from "@src/components/molecules/table/TableActions";
import { usePageParams } from "@src/components/organisms/layout";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CellProps } from "react-table";

interface IMemberProps {
  setUpdateId: any;
  setIsUpdate: any;
  onMemberModalOpen: any;
  onCloseHandler: any;
  data: any;
  isLoading: any;
}

const MemberManagementList: React.FC<IMemberProps> = ({
  setUpdateId,
  setIsUpdate,
  onMemberModalOpen,
  onCloseHandler,
  data,
  isLoading,
}) => {
  const { pageParams } = usePageParams();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
      },

      {
        header: "Full Name",
        accessorKey: "fullName",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
      },
      {
        header: "Nationality",
        accessorKey: "nationality",
      },
      {
        header: "Tier",
        accessorKey: "membershipTierName",
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
        cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original.id);
            setIsUpdate(true);
            onMemberModalOpen();
          };
          const onView = () => {
            navigate(NAVIGATION_ROUTES.PROFILE_DETAIL, {
              state: row.original,
            });
          };

          return (
            <Stack alignItems={"flex-start"}>
              <TableActions onEdit={onEdit} onView={onView} />
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
        btnText="Add Member"
        CurrentText="Member List"
        onAction={() => {
          onCloseHandler();
          onMemberModalOpen();
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
export default MemberManagementList;
