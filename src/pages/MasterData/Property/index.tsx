import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import PropertyList from "@soaltee-loyalty/components/templates/master-data/property-list";
import { getAllProperty } from "@soaltee-loyalty/service/master-data";

import { useQuery } from "react-query";
import { api } from "@soaltee-loyalty/service/api";

const PropertyPage = () => {
  const { data, isLoading } = useQuery(
    api.master_data.property_list.fetch,
    getAllProperty,
    {
      select: ({ data }) => data.datalist,
    }
  );

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
