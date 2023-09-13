import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import MemberList from "@src/components/templates/admin/master-data/member-tier/member-tier-list";
import { getAllMemberTier } from "@src/service/master-data/member-tier";
import { useState } from "react";
import { useQuery } from "react-query";

const MemberPage = () => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useQuery("member_tier", getAllMemberTier, {
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
      <BreadCrumb name="Master Data" subname="Membership Tier" />
      <Content>
        <MemberList
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

export default MemberPage;
