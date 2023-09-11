import { Stack } from "@chakra-ui/react";
import Switch from "@src/components/atoms/Switch";
import DataTable from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { IMember } from "@src/interface/member-management";
import { IParams } from "@src/interface/params";
import { NAVIGATION_ROUTES } from "@src/routes/routes.constant";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CellProps } from "react-table";

interface IMemberTable {
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onEditData?: ((id: string) => void) | undefined;
  onDeleteData?: ((id: string) => void) | undefined;
  paginatedData: IMember[];
  pageParams: IParams;
}

const MemberTable: React.FC<IMemberTable> = ({
  tableDataFetching,
  onAction,
  title,
  btnText,
  CurrentText,
  onEditData,
  paginatedData,
  pageParams,
}) => {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (_: any, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Full Name",
        accessor: "fullName",
        width: "20%",
      },
      {
        Header: "Email",
        accessor: "email",
        width: "10%",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        width: "20%",
      },
      {
        Header: "Nationality",
        accessor: "nationality",
        width: "10%",
      },
      {
        Header: "Tier",
        accessor: "membershipTierName",
        width: "10%",
      },
      {
        Header: "Is Blocked?",
        accessor: "isBlocked",
        width: "10%",
        Cell: ({ row }: CellProps<{ isBlocked: boolean }>) => {
          const status = row?.original?.isBlocked;
          return status === true ? (
            <Switch value={true} variant="red" />
          ) : (
            <Switch disabled />
          );
        },
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string }>) => {
          const onEdit = () => {
            onEditData && onEditData(row.original?.id);
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
export default MemberTable;
