import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import PropertyList from "@soaltee-loyalty/components/templates/master-data/property-list";

const PropertyPage = () => {
  return (
    <>
      <BreadCrumb name="Master Data" />
      <Content>
        <PropertyList />
      </Content>
    </>
  );
};

export default PropertyPage;
