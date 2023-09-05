import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import PropertyList from "@src/components/templates/admin/master-data/property/property-list";
import { getAllProperty } from "@src/service/master-data/property";

import { useQuery } from "react-query";

const PropertyPage = () => {
  const { data, isLoading } = useQuery("property", getAllProperty, {
    select: ({ data }) => data.data,
  });

  return (
    <>
      <BreadCrumb name="Master Data" />
      <Content>
        <PropertyList tableData={data} tableDataFetching={isLoading} />
      </Content>
    </>
  );
};

export default PropertyPage;
