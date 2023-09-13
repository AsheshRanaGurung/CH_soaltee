import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import { getPaginatedData } from "@src/components/organisms/table/pagination";
import OfferList from "@src/components/templates/admin/offer/offer-list";
import { getAllOffer } from "@src/service/offer";
import { useState } from "react";

import { useQuery } from "react-query";

const OfferPage = () => {
  const [pageParams, setPageParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useQuery(["offer", pageParams], getAllOffer, {
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
      <BreadCrumb name="Master Data" />
      <Content>
        <OfferList
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

export default OfferPage;
