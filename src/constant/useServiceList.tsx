import { IService } from "@src/interface/pointConfig";
import { getAllService } from "@src/service/point-config/service";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useServiceList = () => {
  const [data, setData] = useState([]);
  const { data: serviceData } = useQuery("service", getAllService, {
    select: (data) => data.data.datalist,
  });

  useEffect(() => {
    const serviceList =
      serviceData?.map((item: IService) => ({
        label: item?.serviceName,
        value: item?.id,
      })) || [];
    setData(serviceList);
  }, [serviceData]);

  return data;
};
