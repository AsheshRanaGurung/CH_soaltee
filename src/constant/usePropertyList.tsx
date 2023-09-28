import { api } from "@src/service/api";
import {
  gePropertyById,
  getAllPropertySelect,
} from "@src/service/master-data/property";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const usePropertyList = () => {
  const [data, setData] = useState([]);
  const { data: propertyData } = useQuery("property", getAllPropertySelect, {
    select: (data) => data?.data?.data,
  });
  useEffect(() => {
    setData(propertyData);
  }, [propertyData]);
  return data;
};

export const usePropertyById = (id: any) => {
  console.log(!!id, "idSS");

  const { data: propertyData } = useQuery(
    api.master_data.property_list.single_property,
    () => gePropertyById(id),
    {
      select: (data) => data?.data?.data,
      enabled: !!id,
    }
  );

  return propertyData;
};
