import { Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { usePageParams } from "@src/components/organisms/layout";
import { CellProps } from "react-table";
import TableActions from "@src/components/molecules/table/TableActions";
import TableHeadings from "@src/components/molecules/table-heading";
import BasicTable from "@src/components/molecules/table";
import { colors } from "@src/theme/colors";
import styled from "styled-components";
import {
  IMemberTierOne,
  IMembershipServiceRequest,
  IService,
} from "@src/interface/pointConfig";

interface IServiceProps {
  setUpdateId: any;
  setIsUpdate: any;
  onServiceModalOpen: any;
  onCloseHandler: any;
  data: any;
  isLoading: any;
  onDeleteServiceOpen: any;
  onDeleteService: any;
  setDeleteId: any;
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
const ServiceList: React.FC<IServiceProps> = ({
  setUpdateId,
  setIsUpdate,
  onServiceModalOpen,
  onCloseHandler,
  data,
  isLoading,
  onDeleteServiceOpen,
  setDeleteId,
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
        header: "Service",
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
      {
        header: "Action",
        width: "10%",

        cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            setUpdateId(row.original.id);
            setIsUpdate(true);
            onServiceModalOpen();
          };
          const onDelete = () => {
            setDeleteId(row.original.id);
            onDeleteServiceOpen();
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
        btnText="Add Service"
        CurrentText="Service List"
        onAction={() => {
          onCloseHandler();
          onServiceModalOpen();
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
export default ServiceList;
