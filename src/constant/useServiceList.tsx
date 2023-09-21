import { getAllService } from "@src/service/point-config/service";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useServiceList = () => {
  const [data, setData] = useState([]);
  const { data: serviceData } = useQuery("service", getAllService, {
    select: (data) => data?.data?.data,
  });

  useEffect(() => {
    setData(serviceData);
  }, [serviceData]);

  return data;
};
