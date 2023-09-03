import { BreadCrumb } from "@src/components/atoms/Breadcrumb";
import Content from "@src/components/molecules/content";
import ServiceList from "@src/components/templates/pointConfiguration/services/service-list";
import { getAllService } from "@src/service/point-config";
import { useQuery } from "react-query";

const ServicePage = () => {
  const { data, isLoading } = useQuery("service", getAllService, {
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
