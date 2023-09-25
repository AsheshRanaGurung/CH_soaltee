import BasicTable from "@src/components/molecules/table";
import TableHeadings from "@src/components/molecules/table-heading";
import { usePageParams } from "@src/components/organisms/layout";
import {
  IMemberTierOne,
  IMembershipServiceRequest,
  IService,
} from "@src/interface/pointConfig";
import { colors } from "@src/theme/colors";
import { useMemo } from "react";
import styled from "styled-components";

interface IMemberTierTable {
  tableData?: any;
  tableDataFetching?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  // gap: 4%;
  flex-wrap: wrap;
  text-align: center;
  position: relative;
  div {
    position: relative;

    flex: 0 0 20%;
    margin-bottom: 10px;

    &::after {
      content: "";
      position: absolute;
      border-right: 1px solid #ccc;
      height: 90%;
      top: 0;
      right: 0px;
    }
    &:first-child {
      &::before {
        content: "";
        position: absolute;
        border-right: 1px solid #ccc;
        height: 90%;
        top: 0;
        left: 0;
      }
    }
  }
  .title {
    font-size: 14px;
    color: ${colors.primary};
    font-weight: 500;
  }
  .percent {
    font-size: 14px;
    color: ${colors.secondary_black};
    font-weight: 500;
    margin-top: 5px;
  }
`;

const Historytable: React.FC<IMemberTierTable> = ({
  tableData,
  tableDataFetching,
}) => {
  const { pageParams } = usePageParams();

  const columns = useMemo(
    () => [
      {
        header: "S.N",
        accessorFn: (_: IService, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        header: "Service Name",
        accessorKey: "serviceName",
        width: "20%",
      },
      {
        header: "Code",
        accessorKey: "serviceCode",
        width: "10%",
      },
      {
        header: "Member",
        accessorKey: "membershipServiceResponseDtos",
        width: "50%",
        textAlign: "center",
        cell: ({
          row,
        }: {
          row: {
            original: {
              membershipServiceResponseDtos?: IMembershipServiceRequest[];
            };
          };
        }) => {
          return (
            <Wrapper>
              {row?.original?.membershipServiceResponseDtos?.map(
                (itmm: IMemberTierOne, index: number) => (
                  <div key={index}>
                    <h1 className="title">{itmm.membershipName}</h1>
                    <h1 className="percent">{`${itmm.rewardPercentage}%`}</h1>
                  </div>
                )
              )}
            </Wrapper>
          );
        },
      },
      // {
      //   header: "Action",
      //   width: "10%",

      //   cell: ({ row }: CellProps<{ id: string; name: string }>) => {
      //     const onEdit = () => {
      //       // onEditData && onEditData(row.original?.id);
      //     };
      //     const onDelete = () => {
      //       // onDeleteData && onDeleteData(row.original?.id);
      //     };
      //     return (
      //       <Stack alignItems={"flex-start"}>
      //         <TableActions onEdit={onEdit} onDelete={onDelete} />
      //       </Stack>
      //     );
      //   },
      // },
    ],
    [pageParams]
  );
  return (
    <>
      <TableHeadings
        // btnText="Add H"
        CurrentText="History List"
      />
      <BasicTable
        data={tableData?.data || []}
        columns={columns}
        isLoading={tableDataFetching}
        totalPages={tableData?.totalPages}
      />
    </>
  );
};
export default Historytable;
