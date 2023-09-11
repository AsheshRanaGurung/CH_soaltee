import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getAllBonus } from "@src/service/point-config/bonus";
import BonusList from "@src/components/templates/admin/pointConfiguration/bonus/bonus-list";
import { useQuery } from "react-query";
import { useState } from "react";
import { getPaginatedData } from "@src/components/organisms/table/pagination";

const BonusPage = () => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useQuery("bonus", getAllBonus, {
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
      <BreadCrumb name="Point Configuration" />
      <Content>
        <BonusList
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

export default BonusPage;
