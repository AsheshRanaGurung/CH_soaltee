import { Stack } from "@chakra-ui/react";
import DataTable, { Pagination } from "@src/components/organisms/table";
import TableActions from "@src/components/organisms/table/TableActions";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import {
  IMemberTierOne,
  IMembershipServiceRequest,
  IService,
} from "@src/interface/pointConfig";
import { colors } from "@src/theme/colors";
import { useMemo, useState } from "react";
import { CellProps } from "react-table";
import styled from "styled-components";

interface IMemberTierTable {
  tableData?: IService[];
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onMemberModalOpen?: () => void;
  onEditData?: ((id: string) => void) | undefined;
  onDeleteData?: ((id: string) => void) | undefined;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 4%;
  text-align: center;
  position: relative;
  div {
    position: relative;
    flex: 0 0 20%;
    &::after {
      content: "";
      position: absolute;
      border-right: 1px solid #ccc;
      height: 100%;
      top: 0;
      right: 0px;
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
  &::before {
    content: "";
    position: absolute;
    border-right: 1px solid #ccc;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

const ServiceTable: React.FC<IMemberTierTable> = ({
  tableData,
  tableDataFetching,
  onAction,
  title,
  btnText,
  CurrentText,
  onEditData,
  onDeleteData,
}) => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });
  const paginatedData = getPaginatedData({
    tableData,
    pageParams,
  });
  const _pageChange = (page: number) => {
    setPageParams({ ...pageParams, page });
  };
  const _pageSizeChange = (limit: number) =>
    setPageParams({ ...pageParams, limit, page: 1 });

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (_: IService, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
        width: "10%",
      },

      {
        Header: "Service",
        accessor: "serviceName",
        width: "20%",
      },
      {
        Header: "Code",
        accessor: "serviceCode",
        width: "10%",
      },
      {
        Header: "Member",
        accessor: "membershipServiceResponseDtos",
        width: "30%",
        textAlign: "center",
        Cell: ({
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
                    <h1 className="title">{itmm.membershipTierName}</h1>
                    <h1 className="percent">{itmm.rewardPercentage}</h1>
                  </div>
                )
              )}
            </Wrapper>
          );
        },
      },
      {
        Header: "Action",
        width: "10%",

        Cell: ({ row }: CellProps<{ id: string; name: string }>) => {
          const onEdit = () => {
            onEditData && onEditData(row.original?.id);
          };
          const onDelete = () => {
            onDeleteData && onDeleteData(row.original?.id);
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
      <DataTable
        data={paginatedData || []}
        loading={tableDataFetching}
        columns={columns}
        CurrentText={CurrentText}
        btnText={btnText}
        onAction={onAction}
        title={title}
      ></DataTable>

      <Pagination
        enabled={true}
        queryPageIndex={pageParams.page}
        queryPageSize={pageParams.limit}
        totalCount={tableData?.length || 0}
        pageChange={_pageChange}
        pageSizeChange={_pageSizeChange}
      />
    </>
  );
};
export default ServiceTable;
