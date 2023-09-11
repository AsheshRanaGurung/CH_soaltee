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
}

const ReportList: React.FC<IMemberTierTable> = ({
  tableData,
  tableDataFetching,
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
        CurrentText={"Report Data"}
        btnText={"export"}
        optionGroup={
          <Flex justifyContent={"space-between"} alignItems={"center"} gap={2}>
            <FormControl
              control="CustomSelect"
              height="42px"
              options={nationality ?? []}
              size="sm"
              register={register}
              name="Platinum Tier"
              placeholder={"platinum Tier"}
              marginBottom={"0px"}
            />
            <FormControl
              control="CustomSelect"
              options={nationality ?? []}
              size="sm"
              height="42px"
              register={register}
              name="Soalteekathmandu"
              placeholder={"Soaltee kathmandu"}
              marginBottom={"0px"}
            />
          </Flex>
        }
      ></DataTable>

      {tableData && tableData?.length > 0 && (
        <Pagination
          enabled={true}
          queryPageIndex={pageParams.page}
          queryPageSize={pageParams.limit}
          totalCount={tableData?.length || 0}
          pageChange={_pageChange}
          pageSizeChange={_pageSizeChange}
        />
      )}
    </>
  );
};
export default ReportList;
