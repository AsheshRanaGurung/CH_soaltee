import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import StaffManagementList from "@src/components/templates/admin/staff-management/staff-list";
import { getAllStaff } from "@src/service/staff-management";
import { useState } from "react";
import { useQuery } from "react-query";

const StaffManagementPage = () => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useQuery("staff_management", getAllStaff, {
    select: ({ data }) => data.datalist,
  });
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
      <BreadCrumb name="Staff Management" />
      <Content>
        <StaffManagementList
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

export default StaffManagementPage;
