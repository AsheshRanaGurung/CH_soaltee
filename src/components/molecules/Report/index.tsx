import { Flex } from "@chakra-ui/react";
import FormControl from "@src/components/atoms/FormControl";
import DataTable, { Pagination } from "@src/components/organisms/table";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import { nationality } from "@src/constant/index";
import { useFormHook } from "@src/hooks/useFormhook";
import { IProperty } from "@src/interface/master-data/property";
import { useMemo, useState } from "react";

interface IMemberTierTable {
  tableData?: IProperty[];
  tableDataFetching?: boolean;
  onAction?: () => void;
  title?: string;
  btnText?: string;
  CurrentText?: string;
  onMemberModalOpen?: () => void;
  onEditData?: ((id: string) => void) | undefined;
  onDeleteData?: ((id: string) => void) | undefined;
}

const ReportTable: React.FC<IMemberTierTable> = ({
  tableData,
  tableDataFetching,
  onAction,
  title,
  CurrentText,
}) => {
  const { register } = useFormHook({});
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
        accessor: (_: IProperty, index: number) =>
          (pageParams.page - 1) * pageParams.limit + (index + 1),
      },

      {
        Header: "Name",
        accessor: "fullName",
      },
      {
        Header: "Points",
        accessor: "rewardPoints",
      },
      {
        Header: "Rewarded Points",
        accessor: "redeemPoints",
      },
      {
        Header: "Redeemed Points",
        accessor: "code",
      },
      {
        Header: "Tier",
        accessor: "membershipName",
      },
      {
        Header: "Created From",
        accessor: "propertyName",
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
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
        onAction={onAction}
        exports={"export"}
        title={title}
        optionGroup={
          <Flex justifyContent={"space-between"}>
            <FormControl
              control="CustomSelect"
              options={nationality ?? []}
              size="sm"
              register={register}
              name="Platinum Tier"
              placeholder={"platinum Tier"}
            />
            <FormControl
              control="CustomSelect"
              options={nationality ?? []}
              size="sm"
              register={register}
              name="Soalteekathmandu"
              placeholder={"Soaltee kathmandu"}
            />
          </Flex>
        }
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
export default ReportTable;
