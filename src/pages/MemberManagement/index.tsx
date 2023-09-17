import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import MemberManagementList from "@src/components/templates/admin/member-management/member-list";
import { getAllMembers } from "@src/service/member-management";
import { useState } from "react";
import { useQuery } from "react-query";

const MemberManagementPage = () => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 50,
  });
  const { data, isLoading } = useQuery(
    ["member_management", pageParams],
    getAllMembers,
    {
      select: ({ data }) => data.data,
    }
  );
  const paginatedData = getPaginatedData({
    tableData: data,
    pageParams,
  });
  const _pageChange = (page: number) => {
    setPageParams({ ...pageParams, page });
  };
  const _pageSizeChange = (limit: number) =>
    setPageParams({ ...pageParams, limit, page: 1 });

  return (
    <>
      <BreadCrumb name="Member Management" />
      <Content>
        <MemberManagementList
          paginatedData={paginatedData}
          _pageChange={_pageChange}
          _pageSizeChange={_pageSizeChange}
          tableData={data}
          tableDataFetching={isLoading}
          pageParams={pageParams}
        />
      </Content>
    </>
  );
};

export default MemberManagementPage;
