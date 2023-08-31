import { BreadCrumb } from "@soaltee-loyalty/components/atoms/Breadcrumb";
import Content from "@soaltee-loyalty/components/molecules/content";
import ServiceList from "@soaltee-loyalty/components/templates/pointConfiguration/services/service-list";
import { getAllService } from "@soaltee-loyalty/service/point-config";
import { useQuery } from "react-query";

const ServicePage = () => {
  const { data, isLoading } = useQuery("service_fetch", getAllService, {
    select: ({ data }) => data.datalist,
  });
  return (
    <>
      <BreadCrumb name="Point Configuration" />
      <Content>
        <ServiceList data={data} isLoading={isLoading} />
      </Content>
    </>
  );
};

export default ServicePage;
