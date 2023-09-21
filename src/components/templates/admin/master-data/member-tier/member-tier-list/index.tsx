import { Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { IMemberTierDetail } from "@src/interface/master-data/property";
import TableHeadings from "@src/components/molecules/table-heading";
import BasicTable from "@src/components/molecules/table";
import { usePageParams } from "@src/components/organisms/layout";
import { ColorInList } from "@src/assets/svgs";
import { CellProps } from "react-table";
import styled from "styled-components";
import TableActions from "@src/components/molecules/table/TableActions";
interface IMemberTier {
  setUpdateId: any;
  setIsUpdate: any;
  onMemberModalOpen: any;
  onCloseHandler: any;
  data: any;
  isLoading: any;
  onDeleteMemberTierOpen: any;
  onDeleteMemberTier: any;
  setDeleteId: any;
  setViewId: any;
  onViewMemberTierOpen: any;
}

const ColorTierStyled = styled.div`
  svg {
    path {
      fill: ${(props) => props.color || "transparent"};
    }
  }
`;
const MemberList: React.FC<IMemberTier> = ({
  setUpdateId,
  setIsUpdate,
  onMemberModalOpen,
  onCloseHandler,
  data,
  isLoading,
  onDeleteMemberTierOpen,
  setDeleteId,
  setViewId,
  onViewMemberTierOpen,
}) => {
  const { pageParams } = usePageParams();

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: IMemberTierDetail, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        header: "Tier Name",
        accessorKey: "membershipName",
        width: "20%",
      },
      {
        header: "Tier Color",
        width: "15%",
        cell: ({ row }: { row: any }) => (
          <ColorTierStyled color={row.original.colorCode}>
            <ColorInList />
          </ColorTierStyled>
        ),
      },
      {
        header: "Points From Tier",
        accessorKey: "pointsFrom",
        width: "15%",
      },
      {
        header: "Points To Tier",
        accessorKey: "pointsTo",
        width: "15%",
      },
      {
        header: "Image",
        accessorKey: "imageUrl",
        width: "15%",
        cell: ({ row }: any) => {
          return <img src={row.original.imageUrl} alt="Image" width="100" />;
        },
      },

      {
        header: "Action",
        cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original.id);
            setIsUpdate(true);
            onMemberModalOpen();
          };
          const onDelete = () => {
            setDeleteId(row.original.id);
            onDeleteMemberTierOpen();
          };
          const onView = () => {
            setViewId(row.original.id);
            onViewMemberTierOpen();
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
        btnText="Add Member Tier"
        CurrentText="Member Tier List"
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
      {/* <MemberPreview
        isViewOpen={isViewOpen}
        onClose={onViewClose}
        viewId={viewId}
      /> */}
    </>
  );
};
export default MemberList;
