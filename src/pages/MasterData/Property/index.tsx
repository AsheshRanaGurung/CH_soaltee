import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import PropertyList from "@src/components/templates/admin/master-data/property-list";
import { getAllProperty } from "@src/service/master-data/property";

import { useQuery } from "react-query";

const PropertyPage = () => {
  const { data, isLoading } = useQuery("property", getAllProperty, {
    select: ({ data }) => data.datalist,
  });

  return (
    <>
      <BreadCrumb name="Master Data" />
      <Content>
        <PropertyList data={data} isLoading={isLoading} />
      </Content>
    </>
  );
};

export default PropertyPage;
