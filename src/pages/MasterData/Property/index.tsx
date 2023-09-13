import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import PropertyList from "@src/components/templates/admin/master-data/property/property-list";
import { getAllProperty } from "@src/service/master-data/property";
import { useState } from "react";

import { useQuery } from "react-query";

const PropertyPage = () => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useQuery(
    ["property", pageParams],
    getAllProperty,
    {
      select: ({ data }) => data.data.content,
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
      <BreadCrumb name="Master Data" subname="Property List" />
      <Content>
        <PropertyList
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

export default PropertyPage;
